"""
Test script to verify the ArcBuilder backend API is working correctly
"""

import requests
import time
import json
from typing import Optional

API_BASE_URL = "http://localhost:8000"


def test_health_check() -> bool:
    """Test if the backend server is running"""
    try:
        response = requests.get(f"{API_BASE_URL}/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data['message']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print(
            "❌ Cannot connect to backend server. Make sure it's running on port 8000."
        )
        return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False


def test_website_generation() -> Optional[str]:
    """Test website generation endpoint"""
    try:
        print("\n🚀 Testing website generation...")

        # Start generation
        response = requests.post(
            f"{API_BASE_URL}/api/generate",
            json={
                "user_prompt": "Create a simple HTML page with a blue header saying 'Hello World'",
                "recursion_limit": 50,
            },
            headers={"Content-Type": "application/json"},
        )

        if response.status_code != 200:
            print(f"❌ Generation request failed: {response.status_code}")
            print(response.text)
            return None

        data = response.json()
        task_id = data["task_id"]
        print(f"✅ Generation started with task ID: {task_id}")

        return task_id

    except Exception as e:
        print(f"❌ Generation test error: {e}")
        return None


def test_status_polling(task_id: str) -> bool:
    """Test status polling for a task"""
    try:
        print(f"\n⏳ Polling status for task: {task_id}")

        max_attempts = 60  # 1 minute max
        attempt = 0

        while attempt < max_attempts:
            response = requests.get(f"{API_BASE_URL}/api/status/{task_id}")

            if response.status_code != 200:
                print(f"❌ Status check failed: {response.status_code}")
                return False

            data = response.json()
            status = data["status"]
            progress = data.get("progress", {})

            print(f"📊 Status: {status} - {progress.get('message', 'No message')}")

            if status == "completed":
                print(f"✅ Generation completed successfully!")
                print(
                    f"📁 Files generated: {data.get('result', {}).get('file_count', 'Unknown')}"
                )
                return True
            elif status == "failed":
                print(
                    f"❌ Generation failed: {data.get('error_message', 'Unknown error')}"
                )
                return False

            time.sleep(1)
            attempt += 1

        print("❌ Status polling timed out")
        return False

    except Exception as e:
        print(f"❌ Status polling error: {e}")
        return False


def test_download(task_id: str) -> bool:
    """Test downloading the generated website"""
    try:
        print(f"\n⬇️ Testing download for task: {task_id}")

        response = requests.get(f"{API_BASE_URL}/api/download/{task_id}")

        if response.status_code != 200:
            print(f"❌ Download failed: {response.status_code}")
            return False

        # Save the file
        filename = f"test_website_{task_id}.zip"
        with open(filename, "wb") as f:
            f.write(response.content)

        print(f"✅ Download successful: {filename} ({len(response.content)} bytes)")
        return True

    except Exception as e:
        print(f"❌ Download error: {e}")
        return False


def main():
    """Run all tests"""
    print("🧪 ArcBuilder Backend API Tests")
    print("=" * 40)

    # Test 1: Health check
    if not test_health_check():
        print("\n❌ Backend server is not running. Please start it first:")
        print("   cd 'backend/app builder'")
        print("   python start_server.py")
        return

    # Test 2: Website generation
    task_id = test_website_generation()
    if not task_id:
        print("\n❌ Website generation test failed")
        return

    # Test 3: Status polling
    if not test_status_polling(task_id):
        print("\n❌ Status polling test failed")
        return

    # Test 4: Download
    if not test_download(task_id):
        print("\n❌ Download test failed")
        return

    print("\n🎉 All tests passed! The backend integration is working correctly.")
    print("\nYou can now:")
    print("1. Start the frontend: pnpm dev (or npm run dev)")
    print("2. Open http://localhost:3000")
    print("3. Sign in and test the chat interface")


if __name__ == "__main__":
    main()
