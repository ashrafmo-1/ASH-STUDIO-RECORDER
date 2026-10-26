## Download

| Your computer | File to download |
| --- | --- |
| Mac with Apple Silicon (M1 and later) | `Ash-Studio-Recorder-…-mac-arm64.dmg` |
| Mac with Intel | `Ash-Studio-Recorder-…-mac-x64.dmg` |
| Windows 10 or 11 | `Ash-Studio-Recorder-…-windows-setup.exe` |
| Windows, no install | `Ash-Studio-Recorder-…-windows-portable.exe` |

Not sure which Mac you have? Apple menu → **About This Mac**: "Chip: Apple M…" means Apple Silicon.

## First launch on macOS

This pre-release is not signed with a paid Apple certificate yet, so macOS shows
**"Ash Studio Recorder.app" Not Opened** the first time. That is expected.

1. Open the `.dmg` and drag **Ash Studio Recorder** to **Applications**. Do not run it from inside the `.dmg`.
2. Open the app from Applications. When the warning appears, click **Done** (not Move to Trash).
3. Open **System Settings → Privacy & Security**, scroll down, and click **Open Anyway** next to Ash Studio Recorder. Confirm with your password.

Or run this once in Terminal instead of steps 2 and 3:

```bash
xattr -dr com.apple.quarantine "/Applications/Ash Studio Recorder.app"
```

After that the app opens normally. The setup screen then asks for Screen Recording
and Accessibility; click **Restart app** after granting them.

## First launch on Windows

Windows SmartScreen may say **"Windows protected your PC"**, because the installer
is not code-signed yet. Click **More info**, then **Run anyway**.

## Check your download

Each platform has a `SHA256SUMS-….txt` file below. Compare it with:

- macOS: `shasum -a 256 ~/Downloads/Ash-Studio-Recorder-*.dmg`
- Windows (PowerShell): `Get-FileHash .\Ash-Studio-Recorder-*.exe -Algorithm SHA256`

If the values differ, delete the file and do not open it.

## More

- [Install guide](https://github.com/ashrafmo-1/ASH-STUDIO-RECORDER/blob/main/docs/install.md)
- [Uninstall guide](https://github.com/ashrafmo-1/ASH-STUDIO-RECORDER/blob/main/docs/uninstall.md): your recordings are always kept
- [Privacy](https://github.com/ashrafmo-1/ASH-STUDIO-RECORDER/blob/main/docs/privacy.md): everything stays on your computer
- [Report a problem](https://github.com/ashrafmo-1/ASH-STUDIO-RECORDER/issues/new/choose)
