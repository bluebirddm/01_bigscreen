
修复Screen5组件显示问题的完整计划                                                   
                                                                                    
问题总结                                                                            
                                                                                    
Screen5页面中有5个组件不显示：                                                      
1. SecurityCategoryIssuesRadar (PieRoseChart组件问题)                               
2. RiskAgencyCountRanking (Bar3D colorScheme="teal"不支持)                          
3. UnitRiskStatus (DOM尺寸问题)                                                     
4. UnitIssueRectification (DOM尺寸问题)                                             
5. RiskAgencyQualityRanking (Bar3D colorScheme="green"应该支持但可能有其他问题)     
                                                                                    
修复方案                                                                            
                                                                                    
1. 修复Bar3D的colorScheme问题                                                       
                                                                                    
文件: src/components/Bar3D.vue                                                      
- 在validator中添加"teal"支持：['blue', 'red', 'green', 'orange', 'purple', 'teal'] 
- 在colorSchemes对象中添加teal颜色方案：                                            
teal: {                                                                             
  left: ['#4ecdc4', '#3db3ab'],                                                     
  right: ['#5dd4cc', '#4bc0b8'],                                                    
  top: '#6ddbd4'                                                                    
}                                                                                   
                                                                                    
2. 修复PieRoseChart初始化问题                                                       
                                                                                    
文件: src/components/PieRoseChart.vue                                               
- 在initChart函数中添加nextTick确保DOM完全渲染                                      
- 添加容器尺寸检查，确保有有效尺寸再初始化                                          
- 优化resize处理逻辑                                                                
                                                                                    
3. 修复SecurityCategoryIssuesRadar高度问题                                          
                                                                                    
文件: src/components/screen5/SecurityCategoryIssuesRadar.vue                        
- 将height从"100%"改为"263px"以匹配容器固定高度                                     
                                                                                    
4. 修复堆叠柱状图DOM尺寸问题                                                        
                                                                                    
文件: src/components/screen5/UnitRiskStatus.vue                                     
文件: src/components/screen5/UnitIssueRectification.vue                             
- 在onMounted中使用nextTick延迟图表初始化                                           
- 添加容器尺寸检查确保DOM准备就绪                                                   
                                                                                    
5. 检查RiskAgencyQualityRanking问题                                                 
                                                                                    
- 确保Bar3D组件的"green"颜色方案正常工作                                            
- 检查是否存在其他初始化问题                                                        
                                                                                    
修改优先级                                                                          
                                                                                    
1. 高优先级: Bar3D colorScheme修复 (影响2个组件)                                    
2. 高优先级: PieRoseChart初始化优化 (影响1个组件)                                   
3. 中优先级: 堆叠柱状图延迟初始化 (影响2个组件)                                     
                                                                                    
完成这些修复后，所有5个组件都应该能正常显示。                                       
