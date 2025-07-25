# CSS重构总结

## 重构目标
提取三个Screen页面（Screen1.vue、Screen2.vue、Screen3.vue）中的通用CSS样式，消除代码重复，提高可维护性。

## 重构内容

### 创建通用样式文件
- **文件位置**: `src/styles/dashboard-common.css`
- **作用**: 包含所有Screen页面共用的CSS样式

### 提取的通用样式

#### 1. 主容器样式
```css
.dashboard {
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  background: url('../assets/backgroud.png') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
```

#### 2. 头部样式
```css
.dashboard-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url('../assets/head_bg.png') no-repeat center center;
  background-size: cover;
}

.header-content {
  height: 40px;
  max-width: 100%;
  object-fit: contain;
  transform: translateY(-17px);
}
```

#### 3. 主要布局样式
```css
.dashboard-main {
  height: 930px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 0 30px 0;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow: hidden;
}

.center-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 40px;
}
```

#### 4. 面板内容样式
```css
.center-main-area {
  flex: 2;
  position: relative;
  min-height: 0;
}

.center-charts-area {
  flex: 1;
  display: flex;
  gap: 20px;
  min-height: 0;
}

.panel-section {
  padding: 20px;
  flex: 1;
  min-height: 0;
}
```

#### 5. 浮动元素定位
```css
.center-main-area .security-nav-wrapper {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
}

.center-main-area .security-counter-wrapper,
.center-main-area .info-counter-wrapper {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
```

#### 6. 标题样式
```css
.section-title {
  font-size: 18px;
  color: #E5F2F9;
  text-align: left;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 46px;
  background-image: url('/src/assets/little_title_bg.png');
  background-repeat: no-repeat;
  background-position: 0px -8px;
  background-size: auto 60px;
  height: 60px;
}
```

## 修改的文件

### 1. Screen1.vue
- **移除**: 约150行重复CSS代码
- **保留**: Screen1特有的样式（底部图表布局、特定section尺寸等）
- **添加**: 通用样式导入

### 2. Screen2.vue
- **移除**: 约120行重复CSS代码
- **保留**: 仅保留特有样式注释
- **添加**: 通用样式导入

### 3. Screen3.vue
- **移除**: 约120行重复CSS代码
- **保留**: 仅保留特有样式注释
- **添加**: 通用样式导入

## 重构效果

### 代码减少统计
- **总共移除**: 约390行重复CSS代码
- **新增通用文件**: 1个（dashboard-common.css，约100行）
- **净减少**: 约290行代码

### 维护性提升
1. **样式统一**: 所有页面使用相同的基础样式，确保视觉一致性
2. **修改集中**: 通用样式修改只需在一个文件中进行
3. **扩展简化**: 新增Screen页面只需导入通用样式并添加特有样式

### 性能影响
- **构建优化**: Vite会自动处理CSS重复，减少最终包体积
- **缓存友好**: 通用样式可以被浏览器更好地缓存
- **加载效率**: 减少了样式解析时间

## 测试验证
- ✅ Screen1页面正常显示
- ✅ Screen2页面正常显示
- ✅ Screen3页面正常显示
- ✅ 所有样式效果保持一致
- ✅ 布局对齐问题已修复

## 后续建议
1. 考虑将更多组件级别的通用样式提取到这个文件中
2. 可以进一步创建主题变量文件，统一管理颜色、字体等设计tokens
3. 建议在团队开发中建立样式命名规范，避免重复代码产生

## 总结
本次重构成功消除了大量重复CSS代码，提高了代码的可维护性和一致性，同时保持了所有页面的正常功能和视觉效果。这为后续的开发和维护奠定了良好的基础。