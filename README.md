# version

## Usage
```sh
version [command] [version] [args]
```

### Args
`command`
capacitor|ios|android (Optional. Leave blank to version package)

`version`
Exact version (Optional. Leave blank to calculat version)

`--release|-r`
Release type (major|minor|patch) (Default: 'patch')

`--prerelease|-p`
Prerelease tag (Any alphanumeric string) (Default: 'alpha')

`--message|-m`
Message to be used for git commit

`--no-git`
Skip git commit and tag

`--allow-downgrade`
Allow the version to be set to a lower prerelease

`--capacitor`
Copy version to capacitor config file(s)

`--ios-config`
Path to iOS Info.plist file

`--android-config`
Path to Android build.gradle file
