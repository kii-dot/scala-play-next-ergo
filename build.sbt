name := """play-scala-react-seed"""

version := "1.0-SNAPSHOT"

lazy val NexusReleases = "Sonatype Releases".at(
  "https://s01.oss.sonatype.org/content/repositories/releases"
)

lazy val NexusSnapshots = "Sonatype Snapshots".at(
  "https://s01.oss.sonatype.org/content/repositories/snapshots"
)

resolvers ++= Seq(
  NexusReleases,
  NexusSnapshots
) ++ Resolver.sonatypeOssRepos("public") ++ Resolver.sonatypeOssRepos("snapshots")

scalaVersion := "2.12.15"

val PlayCirceVersion = "2712.0"
val SigmaStateVersion = "4.0.3"
val ErgoContractsVersion = "1.0.0"
val ErgoAppKitVersion = "4.0.10"
val ScryptoVersion = "2.1.10"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test
libraryDependencies += "io.github.ergo-lend" % "edge_2.12" % "0.1-SNAPSHOT"
libraryDependencies += "com.dripower" %% "play-circe" % PlayCirceVersion

val Ergo: List[ModuleID] = List(
  "org.scorexfoundation" %% "scrypto"     % ScryptoVersion,
  "org.ergoplatform"     %% "ergo-appkit" % ErgoAppKitVersion,
  "org.scorexfoundation" %% "sigma-state" % SigmaStateVersion
)

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
  .settings(
    libraryDependencies ++=
      Ergo
  )
  .settings(
    watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
  )


addCommandAlias(
  "validateCode",
  "scalafmtSbtCheck; scalafmtCheckAll; uiCodeStyleCheck"
)
