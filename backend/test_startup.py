#!/usr/bin/env python3
"""
Quick test script to verify backend startup and route registration
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))


def test_imports():
    """Test that all modules import correctly"""
    try:
        from main import app
        from auth import AuthService, get_current_user

        print("✅ All imports successful")
        return True
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return False


def test_routes():
    """Test that routes are registered correctly"""
    try:
        from main import app

        routes = [route.path for route in app.routes]
        expected_routes = [
            "/api/generate",
            "/api/auth/verify",
            "/api/auth/user",
            "/api/auth/google",
        ]

        print("Registered routes:")
        for route in routes:
            print(f"  - {route}")

        missing_routes = [route for route in expected_routes if route not in routes]
        if missing_routes:
            print(f"❌ Missing routes: {missing_routes}")
            return False
        else:
            print("✅ All expected routes registered")
            return True
    except Exception as e:
        print(f"❌ Route test failed: {e}")
        return False


def test_auth_service():
    """Test that AuthService initializes correctly"""
    try:
        from auth import AuthService

        auth_service = AuthService()
        print(
            f"✅ AuthService initialized (Supabase configured: {auth_service.supabase_configured})"
        )
        return True
    except Exception as e:
        print(f"❌ AuthService test failed: {e}")
        return False


if __name__ == "__main__":
    print("🧪 Testing ARC Builder Backend...")
    print("=" * 50)

    all_tests_passed = True

    # Run tests
    all_tests_passed &= test_imports()
    all_tests_passed &= test_routes()
    all_tests_passed &= test_auth_service()

    print("=" * 50)
    if all_tests_passed:
        print("🎉 All tests passed! Backend is ready.")
        sys.exit(0)
    else:
        print("💥 Some tests failed. Check the output above.")
        sys.exit(1)
