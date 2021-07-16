# 查询服务列表: listServices 

通过该接口，可以查询服务列表，通过`s cli fc-api listServices -h`可以获得帮助信息：

```
Usage

  s cli fc-api listServices                                                     
  API Document: https://help.aliyun.com/document_detail/175559.htm              

Options

  --region string   The region of fc endpoint. 
  --access string   Specify the key name.      
```

使用案例：

```
s cli fc-api listServices
```

输出结果：

```
  🔑 Using default access: default, If you want to change the default access for fc-api, you can [s cli fc-api set access Your-Access-Alias] to set default value.
  🌍 Using default region: cn-hongkong, If you want to change the default region for fc-api, you can [s cli fc-api set region FC-Region] to set default value.
|
  - serviceName: ai-album
    description: 基于函数计算的人工智能相册系统
    role: acs:ram::1583208943291465:role/al-album
    logConfig:
      project: ai-album
      logstore: functions
      enableRequestMetrics: true
      enableInstanceMetrics: false
    serviceId: 920795b4-d298-4526-ac0b-fe269dff9f1e
    createdTime: '2020-12-26T01:06:48Z'
    lastModifiedTime: '2021-05-05T16:22:28Z'
    vpcConfig:
      vpcId: vpc-j6c9lk4av0859r4e0tff7
      vSwitchIds:
        - vsw-j6c797ywau90y6y03ohbq
      securityGroupId: sg-j6c45wkv4vf4ghg104mc
      role: ''
    internetAccess: true
    nasConfig:
      userId: 10003
      groupId: 10003
      mountPoints:
        - serverAddr: 12391848a0f-qek21.cn-hongkong.nas.aliyuncs.com:/ai-album
          mountDir: /mnt/auto
    vendorConfig: null
    tracingConfig:
      type: null
      params: null
```