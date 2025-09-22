import os
from dotenv import load_dotenv
from langchain.globals import set_verbose, set_debug
from langchain_groq.chat_models import ChatGroq
from langgraph.constants import END
from langgraph.graph import StateGraph
from langgraph.prebuilt import create_react_agent

from agent.prompts import *
from agent.states import Plan, TaskPlan, CoderState
from agent.tools import write_file, read_file, get_current_directory, list_files

# Load environment variables
load_dotenv()

# Configure LangChain based on environment
debug_mode = os.getenv("BACKEND_DEBUG", "true").lower() == "true"
set_debug(debug_mode)
set_verbose(debug_mode)

# Initialize LLM with API key from environment
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable is required")

# Use the specified gpt-oss-120b model
llm = ChatGroq(
    model="openai/gpt-oss-120b",  # Using the requested GPT OSS 120B model
    api_key=groq_api_key,
    temperature=0.1,
    max_tokens=4000,  # Increase token limit for better code generation
    timeout=60  # Set timeout for long requests
)


def planner_prompt(user_prompt: str) -> str:
    return f"Create a plan for the following user prompt: {user_prompt}"


def architect_prompt(plan: str) -> str:
    return f"Create a task plan from the following plan: {plan}"


def coder_system_prompt() -> str:
    return """You are an expert full-stack developer and coding assistant. You specialize in creating modern, responsive web applications.

Your capabilities include:
- HTML5, CSS3, and modern JavaScript (ES6+)
- React, Next.js, Vue.js, and other modern frameworks
- Responsive design with CSS Grid, Flexbox, and media queries
- Modern CSS frameworks like Tailwind CSS, Bootstrap
- Interactive components and animations
- Accessibility best practices (WCAG guidelines)
- SEO optimization
- Performance optimization

When generating code:
1. Create clean, well-structured, and semantic HTML
2. Use modern CSS with proper organization and naming conventions
3. Write efficient, readable JavaScript
4. Ensure responsive design that works on all devices
5. Include proper accessibility attributes
6. Add meaningful comments where necessary
7. Follow current web development best practices

Use the provided tools to read existing files and write new code files as needed."""


def planner_agent(state: dict) -> dict:
    """Converts user prompt into a structured Plan."""
    user_prompt = state["user_prompt"]
    resp = llm.with_structured_output(Plan).invoke(
        planner_prompt(user_prompt)
    )
    if resp is None:
        raise ValueError("Planner did not return a valid response.")
    return {"plan": resp}


def architect_agent(state: dict) -> dict:
    """Creates TaskPlan from Plan."""
    plan: Plan = state["plan"]
    resp = llm.with_structured_output(TaskPlan).invoke(
        architect_prompt(plan=plan.model_dump_json())
    )
    if resp is None:
        raise ValueError("Planner did not return a valid response.")

    resp.plan = plan
    print(resp.model_dump_json())
    return {"task_plan": resp}


def coder_agent(state: dict) -> dict:
    """LangGraph tool-using coder agent."""
    coder_state: CoderState = state.get("coder_state")
    if coder_state is None:
        coder_state = CoderState(task_plan=state["task_plan"], current_step_idx=0)

    steps = coder_state.task_plan.implementation_steps
    if coder_state.current_step_idx >= len(steps):
        return {"coder_state": coder_state, "status": "DONE"}

    current_task = steps[coder_state.current_step_idx]
    existing_content = read_file.run(current_task.filepath)

    system_prompt = coder_system_prompt()
    user_prompt = (
        f"Task: {current_task.task_description}\n"
        f"File: {current_task.filepath}\n"
        f"Existing content:\n{existing_content}\n"
        "Use write_file(path, content) to save your changes."
    )

    coder_tools = [read_file, write_file, list_files, get_current_directory]
    react_agent = create_react_agent(llm, coder_tools)

    react_agent.invoke({"messages": [{"role": "system", "content": system_prompt},
                                     {"role": "user", "content": user_prompt}]})

    coder_state.current_step_idx += 1
    return {"coder_state": coder_state}


graph = StateGraph(dict)

graph.add_node("planner", planner_agent)
graph.add_node("architect", architect_agent)
graph.add_node("coder", coder_agent)

graph.add_edge("planner", "architect")
graph.add_edge("architect", "coder")
graph.add_conditional_edges(
    "coder",
    lambda s: "END" if s.get("status") == "DONE" else "coder",
    {"END": END, "coder": "coder"}
)

graph.set_entry_point("planner")
agent = graph.compile()
if __name__ == "__main__":
    result = agent.invoke({"user_prompt": "Build a colourful modern todo app in html css and js"},
                          {"recursion_limit": 100})
    print("Final State:", result)