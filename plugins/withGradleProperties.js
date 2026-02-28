const { withGradleProperties } = require('@expo/config-plugins');

const withOptimizedGradleProperties = (config) => {
  return withGradleProperties(config, (gradleConfig) => {
    const props = gradleConfig.modResults;

    const set = (key, value) => {
      const existing = props.find((p) => p.type === 'property' && p.key === key);
      if (existing) {
        existing.value = value;
      } else {
        props.push({ type: 'property', key, value });
      }
    };

    set('org.gradle.jvmargs', '-Xmx1536m -XX:MaxMetaspaceSize=512m -XX:+UseG1GC');
    set('org.gradle.daemon', 'true');
    set('org.gradle.parallel', 'true');
    set('org.gradle.caching', 'true');
    set('org.gradle.configureondemand', 'true');
    set('reactNativeArchitectures', 'arm64-v8a');
    set('newArchEnabled', 'true');

    return gradleConfig;
  });
};

module.exports = withOptimizedGradleProperties;
