# onlineStudy

## 所需环境
1.mongodb: v3.4.2    
2.node: v7.6

## 运行步骤
1.mongodb 安装目录下 运行 ```./bin/mongod -dbpath './data'``` 启动数据库进程    
2.项目根目录下运行 ```npm install```                
3.再运行 ```npm run build-dev``` 构建      
4.另一进程中运行 ```npm run start-dev``` 启动,保证3中进程正常运行       
5.打开浏览器 http://localhost:5000/    
