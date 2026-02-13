# DemoLanguageWebRun

A web application for online code execution and syntax highlighting.

## Project Overview

DemoLanguageWebRun is a frontend-backend separated code demonstration platform supporting syntax highlighting and online code execution. The backend service is built with Go, while the frontend interface is built with React + TypeScript + Vite.

## Technology Stack

### Backend (Server)
- **Go** - Primary development language
- **Gin** - Web framework
- **RESTful API** - API design style

### Frontend (Web)
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS Modules** - Style management

## Project Structure

```
DemoLanguageWebRun/
├── server/                 # Go backend service
│   ├── main.go            # Entry point
│   ├── parser_controller.go # Syntax parsing controller
│   ├── run_code_controller.go # Code execution controller
│   └── token.go           # Token data structure definition
├── web/                    # React frontend application
│   ├── src/
│   │   ├── App.tsx        # Main application component
│   │   ├── App.css        # Main style file
│   │   └── ...
│   ├── index.html
│   └── package.json
└── LICENSE
```

## Features

1. **Syntax Highlighting** - Colorized display of keywords, identifiers, brackets, numbers, strings, comments, and other syntax elements
2. **Online Code Parsing** - Lexical analysis of input code to generate a Token sequence
3. **Code Execution** - Supports running code online and displaying execution results
4. **Error Highlighting** - Visual representation of syntax errors

## Quick Start

### Prerequisites

- Go 1.16+
- Node.js 16+
- npm or yarn

### Start the Backend Service

```bash
cd server
go mod download
go run main.go
```

The backend service runs by default at `http://localhost:8080`

### Start the Frontend Development Server

```bash
cd web
npm install
npm run dev
```

The frontend runs by default at `http://localhost:5173`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/parse` | POST | Parse code and return the Token sequence |
| `/api/run` | POST | Execute code and return the result |

### Request Examples

```bash
# Parse Tokens
curl -X POST http://localhost:8080/api/parse \
  -H "Content-Type: application/json" \
  -d '{"code": "your code here"}'

# Execute Code
curl -X POST http://localhost:8080/api/run \
  -H "Content-Type: application/json" \
  -d '{"code": "your code here"}'
```

## Usage Instructions

1. Write code in the input box
2. Click the "Parse" button to view the lexical analysis result (Token sequence)
3. Click the "Run" button to execute the code and view the output
4. Syntax errors are highlighted in red on the interface

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contribution Guidelines

Feel free to submit Issues and Pull Requests to improve this project.