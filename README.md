# RudderStack Automation Framework - Assessment Guide

## 📋 Overview

This WebdriverIO automation framework demonstrates end-to-end testing of RudderStack's event delivery system, combining UI automation with API validation. The framework follows best practices for test automation architecture.

## 🎯 Assessment Scope

**Primary Objective:** Automate the verification of event delivery from source to destination in RudderStack

**Test Flow:**
1. Login to RudderStack application
2. Navigate to connections page and extract configuration
3. Send events via API using extracted credentials
4. Verify event delivery through UI validation

## 🏗️ Framework Architecture

### **Project Structure**
```
├── config/                          # Environment Configuration
│   ├── environment.manager.js       # Central config loader
│   └── environments/
│       ├── dev.config.js           # Development settings
│       ├── qa.config.js            # QA settings  
│       └── prod.config.js          # Production settings
├── src/support/
│   ├── api/
│   │   └── api-helper.js           # Generic API client with retry logic
│   ├── utils/
│   │   └── constants/              # HTTP methods & endpoints
│   ├── client/                     # WebdriverIO client abstractions
│   └── commands/                   # Custom WebdriverIO commands
├── page-objects/                   # Page Object Model implementation
│   └── rudder-stackapp-pages/      # RudderStack specific pages
├── features/                       # Cucumber feature files
│   ├── verify_event_delivery.feature
│   └── step-definitions/           # Step definition implementations
├── test/specs/                     # Test specifications
└── .github/workflows/              # CI/CD pipeline configuration
```

### **Key Design Patterns**

✅ **Page Object Model (POM)** - Maintainable UI automation  
✅ **Environment Management** - Multi-environment support (dev/qa/prod)  
✅ **Secure Credential Handling** - `.env` files + CI/CD secrets  
✅ **Generic API Client** - Reusable HTTP client with retry logic  
✅ **Modular Architecture** - Clear separation of concerns  
✅ **CI/CD Integration** - GitHub Actions with scheduled execution  

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- Chrome browser
- Git

### **Setup Instructions**

1. **Clone and Install**
   ```bash
   git clone ssanadi/WebdriverIO-Automation-Framework
   cd WebdriverIO-Automation-Framework
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your RudderStack credentials, refer to .env.example
   ```
 ```

### **Running Tests**

```bash
# Run all tests
npm run wdio

# Generate reports
npm run report:generate
npm run report:open
```

## 🔧 Framework Features

### **1. Environment Management**
- **Multi-environment support** (dev/qa/prod)
- **Secure credential handling** via environment variables
- **Configurable timeouts** and settings per environment

### **2. API Integration**
- **Generic HTTP client** with axios
- **Automatic retry logic** with exponential backoff
- **Authentication handling** for RudderStack API
- **Configurable timeouts** from environment settings

### **3. UI Automation**
- **Page Object Model** implementation
- **Custom WebdriverIO commands**
- **Wait strategies** for dynamic content
- **Cross-browser support**

### **4. Test Frameworks**
- **Cucumber BDD** for readable test scenarios
- **Mocha/Jasmine** support for traditional testing
- **Allure reporting** for comprehensive test reports

### **5. CI/CD Pipeline**
- **GitHub Actions** workflow
- **Daily scheduled execution** (2 AM UTC)
- **Multi-environment matrix** testing
- **Artifact management** for reports
- **Secret management** for credentials

### **6. Reporting**
- Test execution results