# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 dashboard application called "信息系统智慧可视化大屏" (Information System Smart Visualization Dashboard) built with Vite. It's a full-screen data visualization dashboard designed for displaying system information, rankings, and geographical data distributions in a corporate/government environment.

## Development Commands

```bash
# Start development server (runs on port 3000, opens automatically)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

## Architecture & Key Technologies

### Core Stack
- **Vue 3** with Composition API (`<script setup>` syntax)
- **Vite** for build tooling and development server
- **ECharts 5.4+** with **ECharts GL** for data visualizations
- **vue-echarts** for Vue/ECharts integration

### Dashboard Layout Structure

The application uses a fixed 1920x1080 dashboard layout with these main sections:

1. **Header**: Title bar with gradient background
2. **Main Grid**: 3-column layout (left panel, center panel, right panel)
   - Left Panel: System status, province ranking, unit ranking components
   - Center Panel: Animated counter + 3D China map (main feature)
   - Right Panel: Currently empty/reserved
3. **Bottom Charts**: Horizontal section with distribution charts

### Component Architecture

**Core Components**:
- `App.vue`: Main dashboard layout and animated counter logic
- `China3DMap.vue`: 3D geographical map using ECharts GL with geo3D
- `SystemLayout.vue`: Radar chart + info cards layout
- `SystemRanking.vue`: Stacked bar chart for unit rankings  
- `ProvinceRanking.vue`: Provincial data rankings
- `InfoSystemStatus.vue`: System status indicators
- `ArchitectureDistribution.vue`: System type distribution

### ECharts Integration Pattern

All chart components follow this pattern:
```javascript
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { SpecificChart } from 'echarts/charts' // e.g., BarChart, RadarChart
import { RequiredComponents } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, SpecificChart, ...RequiredComponents])
```

### 3D Map Implementation

The China3DMap component is the centerpiece:
- Uses `echarts-gl` for 3D rendering with `geo3D` coordinate system
- Loads China GeoJSON from Alibaba's DataV service
- Displays scatter3D points for different provinces
- Has disabled user interaction (`roam: false`, sensitivity set to 0)
- Configures lighting, shadows, and post-processing effects

### Styling Approach

- **Color Scheme**: Cyber-blue theme (#00bfff primary, #8cc8ff secondary)
- **Layout**: Absolute positioning with fixed pixel dimensions
- **Effects**: Backdrop filters, glowing borders, gradient backgrounds
- **Typography**: Custom font sizing for different UI elements

### Data Structure

Components use hardcoded mock data arrays. For example:
- Geographic points with `[longitude, latitude, value]` coordinates
- Ranking data with categories, values, and color mappings
- System status counts and percentages

## Development Notes

### Adding New Charts

1. Import required ECharts modules in the component
2. Use `vue-echarts` VChart component with `:option` binding
3. Configure chart options in `onMounted()` lifecycle hook
4. Follow the established color scheme and styling patterns

### Layout Modifications

The dashboard uses CSS Grid and Flexbox with fixed dimensions. Key layout classes:
- `.dashboard-main`: Main 3-column grid (638px, 1162px, 1fr)
- `.bottom-charts`: Bottom chart section with absolute positioning
- Panel sections have fixed heights and responsive behavior within constraints

### Asset Management

- Design assets are in `信息系统切图/` directory  
- Reference designs in `guonengdesignmap/` directory
- Components expect specific aspect ratios and dimensions