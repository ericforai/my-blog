#!/bin/bash

# AI Kids Blog i18n Test Script
# Tests the internationalization functionality of the AI Kids blog

set -e

BASE_URL="http://localhost:4321"
TEST_RESULTS=()
TOTAL_TESTS=0
PASSED_TESTS=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "PASS")
            echo -e "${GREEN}✅ PASS${NC}: $message"
            ;;
        "FAIL")
            echo -e "${RED}❌ FAIL${NC}: $message"
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️  INFO${NC}: $message"
            ;;
        "WARN")
            echo -e "${YELLOW}⚠️  WARN${NC}: $message"
            ;;
    esac
}

# Function to run a test
run_test() {
    local test_name="$1"
    local url="$2"
    local expected_content="$3"
    local test_type="$4"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    print_status "INFO" "Running test: $test_name"
    
    # Make HTTP request
    response=$(curl -s -w "\n%{http_code}" "$url" 2>/dev/null || echo "000")
    http_code=$(echo "$response" | tail -n1)
    content=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ]; then
        case $test_type in
            "html_lang")
                if echo "$content" | grep -q 'lang="'"$expected_content"'"'; then
                    print_status "PASS" "$test_name - Found lang=\"$expected_content\""
                    PASSED_TESTS=$((PASSED_TESTS + 1))
                else
                    print_status "FAIL" "$test_name - Expected lang=\"$expected_content\" but not found"
                fi
                ;;
            "content")
                if echo "$content" | grep -q "$expected_content"; then
                    print_status "PASS" "$test_name - Found expected content: $expected_content"
                    PASSED_TESTS=$((PASSED_TESTS + 1))
                else
                    print_status "FAIL" "$test_name - Expected content not found: $expected_content"
                fi
                ;;
            "hreflang")
                if echo "$content" | grep -q 'hreflang="'"$expected_content"'"'; then
                    print_status "PASS" "$test_name - Found hreflang=\"$expected_content\""
                    PASSED_TESTS=$((PASSED_TESTS + 1))
                else
                    print_status "FAIL" "$test_name - Expected hreflang=\"$expected_content\" but not found"
                fi
                ;;
            "navigation")
                if echo "$content" | grep -q "$expected_content"; then
                    print_status "PASS" "$test_name - Found navigation text: $expected_content"
                    PASSED_TESTS=$((PASSED_TESTS + 1))
                else
                    print_status "FAIL" "$test_name - Expected navigation text not found: $expected_content"
                fi
                ;;
        esac
    else
        print_status "FAIL" "$test_name - HTTP $http_code (Expected 200)"
    fi
    
    echo ""
}

# Function to check if server is running
check_server() {
    print_status "INFO" "Checking if development server is running..."
    
    if curl -s "$BASE_URL" > /dev/null 2>&1; then
        print_status "PASS" "Development server is running at $BASE_URL"
        return 0
    else
        print_status "FAIL" "Development server is not running at $BASE_URL"
        print_status "INFO" "Please run 'npm run dev' in another terminal and try again"
        return 1
    fi
}

# Main test execution
main() {
    echo -e "${BLUE}🧭 AI Kids Blog i18n Test Suite${NC}"
    echo "=================================="
    echo ""
    
    # Check if server is running
    if ! check_server; then
        exit 1
    fi
    
    echo ""
    print_status "INFO" "Starting i18n tests..."
    echo ""
    
    # Test 1: Default Language (English)
    run_test "Default Language" "$BASE_URL/" "en" "html_lang"
    
    # Test 2: Secondary Language (Chinese)
    run_test "Secondary Language" "$BASE_URL/zh/" "zh-CN" "html_lang"
    
    # Test 3: UI String Translation - English Navigation
    run_test "English Navigation" "$BASE_URL/" "Home" "navigation"
    
    # Test 4: UI String Translation - Chinese Navigation
    run_test "Chinese Navigation" "$BASE_URL/zh/" "首页" "navigation"
    
    # Test 5: Content Translation - English Blog
    run_test "English Blog Content" "$BASE_URL/blog/" "AI Blog" "content"
    
    # Test 6: Content Translation - Chinese Blog
    run_test "Chinese Blog Content" "$BASE_URL/zh/blog/" "AI博客" "content"
    
    # Test 7: SEO hreflang Tags - English Page
    run_test "English hreflang" "$BASE_URL/" "en" "hreflang"
    
    # Test 8: SEO hreflang Tags - Chinese Page
    run_test "Chinese hreflang" "$BASE_URL/zh/" "zh" "hreflang"
    
    # Test 9: Language Switcher - English Page
    run_test "English Language Switcher" "$BASE_URL/" "中文" "content"
    
    # Test 10: Language Switcher - Chinese Page
    run_test "Chinese Language Switcher" "$BASE_URL/zh/" "English" "content"
    
    # Test 11: About Page Translation - English
    run_test "English About Page" "$BASE_URL/about" "AI Kids" "content"
    
    # Test 12: About Page Translation - Chinese
    run_test "Chinese About Page" "$BASE_URL/zh/about" "AI小孩" "content"
    
    # Test 13: Blog Post Translation - English
    run_test "English Blog Post" "$BASE_URL/blog/ai-marketing-revolution" "AI Revolution in Marketing" "content"
    
    # Test 14: Blog Post Translation - Chinese
    run_test "Chinese Blog Post" "$BASE_URL/zh/blog/ai-marketing-revolution" "AI 重塑营销" "content"
    
    # Test 15: Newsletter Page - English
    run_test "English Newsletter Page" "$BASE_URL/newsletter" "Subscribe to AI Weekly" "content"
    
    # Test 16: Newsletter Page - Chinese
    run_test "Chinese Newsletter Page" "$BASE_URL/zh/newsletter" "订阅 AI 周刊" "content"
    
    echo ""
    echo "=================================="
    echo -e "${BLUE}Test Results Summary${NC}"
    echo "=================================="
    echo -e "Total Tests: ${BLUE}$TOTAL_TESTS${NC}"
    echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
    echo -e "Failed: ${RED}$((TOTAL_TESTS - PASSED_TESTS))${NC}"
    
    if [ $PASSED_TESTS -eq $TOTAL_TESTS ]; then
        echo ""
        print_status "PASS" "All tests passed! 🎉"
        echo ""
        print_status "INFO" "Your i18n implementation is working correctly!"
        exit 0
    else
        echo ""
        print_status "FAIL" "Some tests failed. Please check the implementation."
        echo ""
        print_status "INFO" "Common issues to check:"
        print_status "INFO" "1. Make sure all translation keys are defined in src/i18n/ui.ts"
        print_status "INFO" "2. Verify that components are using getTranslation() function"
        print_status "INFO" "3. Check that Astro i18n routing is properly configured"
        print_status "INFO" "4. Ensure all pages exist in both /pages/ and /pages/zh/ directories"
        exit 1
    fi
}

# Run the tests
main "$@"
