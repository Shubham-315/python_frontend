# Pipeline Builder Frontend

A visual drag-and-drop pipeline builder application built with React and ReactFlow. This application allows users to create data processing workflows by connecting various node types on an interactive canvas.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| React DOM | 18.2.0 | React rendering |
| ReactFlow | 11.8.3 | Node graph visualization and interaction |
| Zustand | - | Lightweight state management |
| Create React App | 5.0.1 | Build tooling and development server |

## Directory Structure

```
frontend/
├── public/                     # Static assets served directly
│   ├── index.html              # HTML template
│   ├── manifest.json           # PWA configuration
│   ├── robots.txt              # Crawler permissions
│   ├── favicon.ico             # Browser tab icon
│   ├── logo192.png             # App icon (192x192)
│   └── logo512.png             # App icon (512x512)
├── src/                        # Source code
│   ├── components/             # Reusable React components
│   │   └── BaseNode.js         # Base node wrapper component
│   ├── nodes/                  # Node type implementations
│   │   ├── inputNode.js        # Data input node
│   │   ├── outputNode.js       # Data output node
│   │   ├── llmNode.js          # LLM processing node
│   │   ├── textNode.js         # Text templating node
│   │   ├── filterNode.js       # Data filtering node
│   │   ├── mergeNode.js        # Input merging node
│   │   ├── conditionalNode.js  # Conditional branching node
│   │   ├── apiNode.js          # HTTP API node
│   │   └── transformNode.js    # Text transformation node
│   ├── styles/                 # CSS stylesheets
│   │   └── nodes.css           # Node and UI styling
│   ├── index.js                # React entry point
│   ├── index.css               # Global styles
│   ├── App.js                  # Root application component
│   ├── store.js                # Zustand state management
│   ├── ui.js                   # Main ReactFlow canvas
│   ├── toolbar.js              # Node toolbar component
│   ├── draggableNode.js        # Draggable node handler
│   └── submit.js               # Submit button component
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Locked dependency versions
├── LICENSE                     # License information
└── README.md                   # This documentation file
```

---

## Configuration Files

### `package.json`
Project configuration file containing:
- **Project metadata**: Name ("frontend"), version ("0.1.0"), private flag
- **Dependencies**: React, React DOM, ReactFlow, react-scripts
- **Scripts**: Commands for development, testing, building, and ejecting
- **ESLint configuration**: React-specific linting rules
- **Browserslist**: Target browser compatibility settings

### `package-lock.json`
Auto-generated file that locks all dependency versions to ensure reproducible builds across different environments.

---

## Public Assets

### `public/index.html`
The main HTML template that serves as the entry point for the React application.
- Contains the `<div id="root"></div>` element where React mounts the application
- Includes meta tags for viewport, theme color, and description
- Links to manifest.json for PWA support
- Provides fallback content for users with JavaScript disabled

### `public/manifest.json`
Progressive Web App (PWA) manifest configuration:
- **short_name / name**: Application display names
- **icons**: References to logo192.png and logo512.png for home screen icons
- **start_url**: The URL to load when app launches
- **display**: Set to "standalone" for app-like experience
- **theme_color / background_color**: UI color settings

### `public/robots.txt`
Search engine crawler instructions. Currently allows all user-agents to crawl all content.

### `public/favicon.ico`, `logo192.png`, `logo512.png`
Image assets for browser tab icon and PWA installation icons at different resolutions.

---

## Core Source Files

### `src/index.js`
The JavaScript entry point that bootstraps the React application.

**Functionality:**
- Imports React and ReactDOM libraries
- Imports the root App component
- Uses `ReactDOM.createRoot()` to create a root container
- Renders the App component wrapped in `React.StrictMode` for development warnings
- Mounts everything to the DOM element with id "root"

### `src/App.js`
The root application component that assembles the main UI layout.

**Functionality:**
- Imports and renders three main components in order:
  1. `PipelineToolbar` - The top toolbar with draggable nodes
  2. `PipelineUI` - The main ReactFlow canvas
  3. `SubmitButton` - The bottom submit button
- Acts as the parent container for the entire application

### `src/index.css`
Global CSS styles applied to the entire application.

**Styling:**
- Sets body margin to 0 for full-width layout
- Defines font family stack: system fonts with sans-serif fallback
- Applies font smoothing for better text rendering on different platforms

---

## State Management

### `src/store.js`
Centralized state management using Zustand library.

**State Properties:**
- `nodes`: Array of all nodes on the canvas
- `edges`: Array of all connections between nodes
- `nodeIDs`: Object tracking the count of each node type for ID generation

**Functions:**

| Function | Description |
|----------|-------------|
| `getNodeID(type)` | Generates unique node IDs by incrementing a counter per node type (e.g., "customInput-1", "customInput-2") |
| `addNode(node)` | Adds a new node to the nodes array |
| `onNodesChange(changes)` | Handles node updates (position, selection, deletion) using ReactFlow's `applyNodeChanges` |
| `onEdgesChange(changes)` | Handles edge updates using ReactFlow's `applyEdgeChanges` |
| `onConnect(connection)` | Creates new edge connections with animated marker arrows |
| `updateNodeField(nodeId, fieldName, fieldValue)` | Updates a specific field within a node's data object |

**Usage Pattern:**
Components access the store using the `useStore` hook with selectors for specific state slices.

---

## UI Components

### `src/ui.js`
The main ReactFlow canvas component that renders the interactive pipeline editor.

**Functionality:**
- Creates a ReactFlow instance with all node types registered
- Implements drag-and-drop handling for nodes from the toolbar
- Manages the drop zone for creating new nodes at cursor position
- Calculates node position based on drop coordinates and viewport transform

**Features:**
- Grid snapping with 20px grid size
- Dotted background pattern
- ReactFlow Controls (zoom in/out, fit view)
- MiniMap for navigation overview
- Configurable canvas size (100vw × 70vh)

**Node Type Registration:**
Maps node type identifiers to their React components:
```javascript
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  // ... other node types
}
```

### `src/toolbar.js`
The top toolbar component displaying available node types.

**Functionality:**
- Renders a horizontal bar containing all draggable node options
- Creates 9 `DraggableNode` components, one for each node type:
  - Input, LLM, Output, Text, Filter, Merge, Conditional, API, Transform
- Each node displays its type name as a label

**Styling:**
- Fixed position at the top of the viewport
- Horizontal flexbox layout with padding and gap between items

### `src/draggableNode.js`
Individual draggable node item component for the toolbar.

**Functionality:**
- Implements HTML5 Drag and Drop API
- Sets `draggable="true"` on the element
- On drag start:
  - Sets the drag effect to "move"
  - Stores the node type in the dataTransfer object for the drop handler
- Receives `type` and `label` props for configuration

**Usage:**
When users drag a node from the toolbar, the node type is stored in the drag event, allowing the canvas to know which type of node to create on drop.

### `src/submit.js`
Submit button component for sending the pipeline to the backend.

**Functionality:**
- Retrieves current nodes and edges from the Zustand store
- Sends a POST request to `http://localhost:8000/pipelines/parse`
- Request body contains the serialized nodes and edges arrays
- Displays the backend response in an alert dialog showing:
  - `num_nodes`: Total number of nodes in the pipeline
  - `num_edges`: Total number of connections
  - `is_dag`: Whether the pipeline forms a valid Directed Acyclic Graph

**Error Handling:**
Catches and displays any network or parsing errors in an alert.

---

## Base Component

### `src/components/BaseNode.js`
Reusable wrapper component that provides consistent structure for all node types.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | required | Unique node identifier |
| `width` | number | 200 | Node width in pixels |
| `minHeight` | number | 80 | Minimum node height |
| `title` | string | required | Display title in node header |
| `handles` | array | [] | Configuration for input/output handles |
| `children` | node | - | Node content (form fields, etc.) |

**Handle Configuration:**
Each handle object specifies:
- `type`: "source" (output) or "target" (input)
- `position`: Position.Left or Position.Right
- `id`: Unique handle identifier
- `top`: Vertical position as percentage string (e.g., "50%")

**Styling:**
- White background with rounded corners
- Drop shadow for depth
- Blue header bar with node title
- Handles colored: blue (#3b82f6) for source, green (#10b981) for target

---

## Node Types

All nodes are located in `src/nodes/` and implement specific pipeline functionality.

### `inputNode.js` - Data Input Node
**Purpose:** Entry point for data into the pipeline.

**Configuration:**
- **Name**: Text input for naming the input
- **Type**: Dropdown selection (Text / File)

**Handles:**
- 1 source handle (right side) - outputs data to connected nodes

---

### `outputNode.js` - Data Output Node
**Purpose:** Exit point for processed data from the pipeline.

**Configuration:**
- **Name**: Text input for naming the output
- **Type**: Dropdown selection (Text / Image)

**Handles:**
- 1 target handle (left side) - receives data from connected nodes

---

### `llmNode.js` - LLM Processing Node
**Purpose:** Represents a Large Language Model processing step.

**Display:**
- Shows "This is an LLM" as descriptive text

**Handles:**
- 2 target handles (left side):
  - `system`: For system prompt input
  - `prompt`: For user prompt input
- 1 source handle (right side):
  - `response`: Outputs LLM response

---

### `textNode.js` - Text Templating Node
**Purpose:** Creates text templates with dynamic variable placeholders.

**Configuration:**
- **Text**: Multi-line text area for template content
- Variables are defined using `{{variableName}}` syntax

**Dynamic Behavior:**
- Automatically parses text for `{{variable}}` patterns using regex
- Creates a target handle for each unique variable found
- Handles are dynamically added/removed as variables change
- Text area auto-resizes based on content

**Example:**
```
Hello {{name}}, your order {{orderId}} is ready!
```
This creates two input handles: `name` and `orderId`.

**Handles:**
- Dynamic target handles (left side) - one per variable
- 1 source handle (right side) - outputs processed text

---

### `filterNode.js` - Data Filtering Node
**Purpose:** Filters data based on specified conditions.

**Configuration:**
- **Condition**: Dropdown selection
  - Contains
  - Equals
  - Starts With
  - Ends With
- **Value**: Text input for comparison value

**Handles:**
- 1 target handle (left side) - receives input data
- 1 source handle (right side) - outputs filtered data

---

### `mergeNode.js` - Input Merging Node
**Purpose:** Combines two separate inputs into a single output.

**Configuration:**
- **Separator**: Dropdown selection for how to join inputs
  - New Line (`\n`)
  - Space (` `)
  - Comma (`,`)
  - Pipe (`|`)

**Handles:**
- 2 target handles (left side):
  - `input1`: First input
  - `input2`: Second input
- 1 source handle (right side) - outputs merged result

---

### `conditionalNode.js` - Conditional Branching Node
**Purpose:** Routes data based on a condition, creating two execution paths.

**Configuration:**
- **Condition**: Dropdown selection
  - Not Empty
  - Is Empty
  - Is Number
  - Is True

**Handles:**
- 1 target handle (left side) - receives input data
- 2 source handles (right side):
  - `true` (top): Output when condition is true
  - `false` (bottom): Output when condition is false

---

### `apiNode.js` - HTTP API Node
**Purpose:** Makes HTTP requests to external APIs.

**Configuration:**
- **Method**: Dropdown selection
  - GET
  - POST
  - PUT
  - DELETE
- **URL**: Text input for the API endpoint

**Handles:**
- 1 target handle (left side):
  - `body`: Request body input
- 1 source handle (right side):
  - `response`: API response output

---

### `transformNode.js` - Text Transformation Node
**Purpose:** Applies text transformations to input data.

**Configuration:**
- **Operation**: Dropdown selection
  - Uppercase - Converts to all caps
  - Lowercase - Converts to all lowercase
  - Trim - Removes leading/trailing whitespace
  - Reverse - Reverses the string
  - Parse JSON - Parses JSON string to object

**Handles:**
- 1 target handle (left side) - receives input text
- 1 source handle (right side) - outputs transformed text

---

## Styling

### `src/styles/nodes.css`
Comprehensive CSS stylesheet with design tokens and component styles.

**CSS Custom Properties (Design Tokens):**
```css
--node-border-radius: 8px
--node-shadow: 0 4px 6px rgba(0,0,0,0.1)
--node-background: #ffffff
--handle-size: 12px
--handle-source-color: #3b82f6 (blue)
--handle-target-color: #10b981 (green)
```

**Style Sections:**

| Section | Description |
|---------|-------------|
| Base Node Styles | Border radius, shadow, background for node containers |
| Form Field Styles | Input, select, and textarea field styling |
| Node Info Display | Typography and spacing for node content |
| ReactFlow Handles | Custom handle appearance and hover states |
| Edge Styling | Connection line appearance |
| Canvas Background | Dotted grid pattern |
| Toolbar Styling | Top toolbar layout and appearance |
| Draggable Node Styling | Individual toolbar item appearance with cursor |
| Submit Button | Bottom button styling |
| MiniMap & Controls | ReactFlow navigation UI styling |
| Variable Tags | Styling for variable indicators in text node |

---

## Data Flow

### How the Pipeline Works

1. **Node Creation**: Users drag nodes from the toolbar onto the canvas
2. **Configuration**: Each node can be configured via its form fields
3. **Connections**: Users draw edges between node handles to create data flow
4. **Validation**: The Submit button sends the pipeline to the backend
5. **Analysis**: Backend returns pipeline statistics (nodes, edges, DAG status)

### Backend Integration

The frontend communicates with a Python backend at `http://localhost:8000`:

**Endpoint:** `POST /pipelines/parse`

**Request Body:**
```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

---

## Available Scripts

### `npm start`
Runs the development server on [http://localhost:3000](http://localhost:3000).
- Hot reloading enabled for instant updates
- ESLint warnings displayed in console

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Creates an optimized production build in the `build/` folder.
- Minified and bundled for best performance
- Filenames include content hashes for caching

### `npm run eject`
**Warning: One-way operation!**
Removes the single build dependency and copies all configuration files for full customization.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Ensure backend is running:**
   The submit functionality requires the backend at `http://localhost:8000`

---

## License

See the [LICENSE](./LICENSE) file for details.
