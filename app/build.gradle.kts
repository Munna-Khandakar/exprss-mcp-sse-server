plugins {
    `maven-publish`
    alias(i.plugins.node)
    alias(i.plugins.docker)
    alias(i.plugins.helm)

    alias(i.plugins.convention.node)
    alias(i.plugins.convention.docker)
    alias(i.plugins.convention.helm)
}

npm {
    credential(
        packagePrefix = "@hugeicons",
        registry = "npm.hugeicons.com",
        authToken = "FE12F6B9-07048081-45875779-CD99B51E"
    )
    internalPackage("@ideascale/ui", "2.0.58")
    internalPackage("@ideascale/commons", "2.1.48")
}

helm {
    charts {
        create("main") {
            chartName = "mcp-server"
        }
    }
    filtering {
        values.put("imageRegistry", dockerImage.registry)
        values.put("imageRepository", dockerImage.repository)
        values.put("imageTag", project.version)
    }
}
