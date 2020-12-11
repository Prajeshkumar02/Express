const admin = require("firebase-admin");
const path=require('path');
const bodyParser=require('body-parser');
const express=require('express');
const app=express();

const serviceAccount={
    "type": "service_account",
    "project_id": "fir-project1-5b47d",
    "private_key_id": "cc84d994aa1228cbf20601da50a6093044d86af1",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDbM5LHQFUGnfmN\nyQiwa6k7DMwoJ1KewOs+KmMVFFMkRuhikKZdA57lajFy0KAfUeMjvVQtMuSqZd4W\nBMsKxw0Xz5L2oKUht3Q/NFeHujoGq8etmTi1egIJLKtU+nNswIr8tPUtM3W0e3oh\n6oV1459F3gJwE3R9FvlZrL6nvDScc0wylPJl9w82RtbjAHiSfIxhld2zQLN6BjEO\n+/4IwIi1ySNIJhrRgZbf+hpU978nu6LYBJ4rWNT3cxyB7FZgZBw5hfliwKkgsPe1\ntl/vTvJIP1s3t2ocmKaqxh2vrkuefsuQrxKxtR1bQsqpud0TjdABU14l5bk5TuFA\nGQfP9b0DAgMBAAECggEAYjBJbNh73cFw0lq9ei1XunxCjTAEGdnH5mpdRMl8brEW\nkmRCKUMgb5pweQJL34uyR8WcybxU4qFL6KgP/Y1pZ4OTTMdsANzpBRDgros0R921\nzaTnWp9C/zITszaW8p2TBJzYgH1fGc//xuaDDuo947GNfP+x/ACJBGrVYlRzaqqE\niQimtZihCo7eDvULLwJaGIEMwXdZSmNU8KqZ9XEJ4iPFUHcG7wcSidZFR/YbY6lt\nPUXndNDg6zdBz5h2WhXPg+lpIlgLuioOz1I5+9hyDFNGpKg55aBjQ98TB1HPvDco\nZLqpwUYXEc9RtdiqbGZ8DYat3wPJwrYosUfEHU7w5QKBgQD3TN6zymLjYv6O1a9j\nRKPCEDOp7gG0VjF0kUxWNp0+BQnlBAfp9qc4rEtK+YCZUi65ZdqBOJSLiS2g9FwL\nkYXPnDR0row0u8HJYkkD5W2lk+ud2r64xJwSZOk+QL7zi9/zFI0i3kcYgcGYJTlB\nVMHOqjsnrtPbN0Z6hmwtHubqfwKBgQDi6abhqMqlcC0L8sMj6Qe32FNw0l+rcIwq\nr6Y0tzsrcZe5DAwXsjPvOh/gonw3M+2slasV6LatN6DBGoxP04TukC+pPFrOablC\nOPXjOKydyMB0/2TmMMXfb54NT+04W0DmZRfCoPHG0E0gs00o/SKn35Ip9Dtq3ksD\nRRNGrypDfQKBgEjrBY+F0XqyqdR79WcTyiVimZk1cJM4BwUUAqo5GEw9OBmrAppd\n/Bid1OWag+yxas2H1tHbWRF7tVSMOMfAdPAuYtk0zmqOIim7LURU1evIneTBpxLc\nBhj2YD/W33b4e2Q1Xxg06kmzmN2/vA4ja7IAR8j/p8AvoDxofmUfg38JAoGAM4bf\nUGrl6X95mzb7PRJToFnNSNdcxi9+hMryMRJSq2DWFT05GcBrrq1CQ95h2p8+H2y1\nNvprURZKuM7wgcgEba/sQr/j1u+HFBSfMYPTHtlRar/8B5GXvU85UsiNk7iVGjxm\nktm9TWpLuVs98ErbLcfFByXgwDnOSuXKpMhuDnkCgYADIrwkTvxjknduv8L++akw\nT/MTHXRK4NeIFxFBsGUKycx7jiPKGgbskJswfAWrk+vF9rh3ATfDGnIgQENn8ecA\niM83ziffedTymOiPangeMpNHg3uwfslrEq253HAVPUh1RIm/qzk7jy1RM8wieZX9\nYI3WzVKcxxkEdznmv2JAaQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ajmjo@fir-project1-5b47d.iam.gserviceaccount.com",
    "client_id": "111080734821520705307",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ajmjo%40fir-project1-5b47d.iam.gserviceaccount.com"
  };

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db=admin.firestore();
  
  app.use(express.json());
  app.post('/create',(request,response)=>{
    let student= request.body;
    db.collection('StudentDB').doc('StudentDetails4').set(student);
    response.send("Created Successfully");
  });
  
  app.get('/read',(request,response)=>
  {
    let id=request.query.id;
    db.collection('StudentDB').doc(id).get().then((data)=>console.log(data.data()));
    response.send("Data Obtained Successfully");
  })

  app.delete('/delete',(request,response)=>{
    let id=request.query.id;
    db.collection('StudentDB').doc(id).delete();
    response.send("Deleted Successfully");
  })

  app.put('/update',(request,response)=>{
    let id=request.query.id;
    let newStudent=request.body;
    db.collection('StudentDB').doc(id).update(newStudent);
    response.send("Updated Successfully");
  })

  app.listen(5003,()=>{
       console.log("Running at port 5003 ");
   ;})





 
