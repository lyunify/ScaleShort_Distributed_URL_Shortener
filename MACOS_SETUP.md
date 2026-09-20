# Shorto：macOS 本地运行指南

在 Mac 上运行 Shorto，使用 Java 17 启动 Spring Boot 应用，使用本机 Redis 保存短链接。默认访问地址为 http://localhost:8080。

## 1. 安装依赖

先安装 [Homebrew](https://brew.sh/)，再在终端执行：

```bash
brew install openjdk@17 gradle@8 redis
```

在当前终端选择 Java 17 和 Gradle 8：

```bash
export JAVA_HOME="$(brew --prefix openjdk@17)/libexec/openjdk.jdk/Contents/Home"
export PATH="$JAVA_HOME/bin:$(brew --prefix gradle@8)/bin:$PATH"
java -version
gradle --version
```

重新打开终端后需要重新设置这两个环境变量，也可以将这两行 `export` 加入自己的 `~/.zshrc`。

依赖安装信息可查阅 Homebrew 的 [Java 17](https://formulae.brew.sh/formula/openjdk@17) 和 [Gradle 8](https://formulae.brew.sh/formula/gradle@8) 页面。

## 2. 启动 Redis

```bash
brew services start redis
redis-cli ping
```

返回 `PONG` 表示 Redis 可以连接。应用默认连接 `localhost:6379`，使用无密码、无 TLS 的本地连接。

Redis 的持久化方式取决于本机配置；上述安装步骤不保证已开启 AOF。如需 AOF，请在 `$(brew --prefix)/etc/redis.conf` 中设置 `appendonly yes`，再执行 `brew services restart redis`。可通过 `redis-cli CONFIG GET appendonly` 检查设置。

## 3. 启动 Shorto

进入包含 `build.gradle` 的项目根目录，执行：

```bash
gradle bootRun
```

浏览器打开 **http://localhost:8080**。健康检查地址为 **http://localhost:8080/actuator/health**。

也可以先运行测试、打包，再启动：

```bash
gradle clean build
java -jar build/libs/shorto-1.0.0.jar
```

两种启动方式任选一种，避免同时占用 8080 端口。当前仓库缺少 `gradle-wrapper.jar`，因此本指南使用已安装的 Gradle 8，而不是 `./gradlew`。

## 4. 可选：运行项目介绍页

这套页面用于介绍 Shorto 的技术设计，独立于 8080 端口的实际操作页面。

安装 Node.js 后，在另一个终端执行：

```bash
cd shorto-presentation
npm ci
npm run dev
```

打开 **http://localhost:3000**。

## 本地配置

| 环境变量 | 默认值 | 用途 |
|---|---|---|
| `REDIS_HOST` | `localhost` | Redis 地址 |
| `REDIS_PORT` | `6379` | Redis 端口 |
| `REDIS_PASSWORD` | 空 | Redis 密码 |
| `REDIS_SSL_ENABLED` | `false` | 是否启用 TLS |
| `APP_BASE_URL` | `http://localhost:8080` | 生成短链接时使用的地址 |
| `DEFAULT_TTL_SECONDS` | `2592000` | 新链接默认有效期，单位为秒 |

本指南使用默认单机模式，无需设置 `SPRING_PROFILES_ACTIVE`。仓库中的 Docker 集群配置是独立的部署配置，不用于以上本机启动步骤。

## 停止与排查

- 应用运行终端按 `Ctrl+C` 停止 Shorto；项目介绍页同样操作。
- 不再需要 Redis 时执行 `brew services stop redis`。
- Redis 连接失败：检查 `redis-cli ping` 和环境变量是否与本机配置一致。
- Java 或 Gradle 版本不对：重新执行第一步的环境变量设置，并检查版本输出。
- 8080 被占用：停止已运行的 Shorto，或设置 `SERVER_PORT`，并同步修改 `APP_BASE_URL` 的端口。
