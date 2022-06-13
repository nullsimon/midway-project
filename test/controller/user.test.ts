import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';


describe('test/controller/user.test.ts', () => {
    let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch(err) {
        console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });


  it('should POST /api/users', async () => {

    // make request
    const result = await createHttpRequest(app).post('/api/users').send({ username: 'jack', password: 'redballoon' });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe('OK');
  });


  it('should POST /api/users/login', async () => {

    // make request
    const result = await createHttpRequest(app).post('/api/users/login').send({ username: 'jack', password: 'redballoon' });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登录成功');
    expect(result.body.data.token).toBeDefined();
  });

  it('should POST /api/users/login', async () => {

    // make request
    const result = await createHttpRequest(app).post('/api/users/login').send({ username: "redballoon", password: "jack" });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(400);

  });
});
