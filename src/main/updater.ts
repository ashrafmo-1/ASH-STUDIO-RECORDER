import { app, dialog, shell, type MessageBoxOptions } from 'electron'
import { autoUpdater } from 'electron-updater'
import { recorderManager } from '@main/recorder/manager'
import { getMainWindow } from '@main/window'

/** How often a running app looks for a newer release. */
const CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000

/** Only published releases are listed here; drafts stay invisible to users. */
const LATEST_RELEASE_URL = 'https://github.com/ashrafmo-1/ASH-STUDIO-RECORDER/releases/latest'

const logWarning = (message: string, error?: unknown): void => {
  console.warn(`[updater] ${message}`, error ?? '')
}

/** Shows a dialog over the main window when one is open, and resolves to the chosen button index. */
const ask = async (options: MessageBoxOptions): Promise<number> => {
  const window = getMainWindow()
  const result =
    window && !window.isDestroyed()
      ? await dialog.showMessageBox(window, options)
      : await dialog.showMessageBox(options)
  return result.response
}

/**
 * Keeps installed copies current. Windows downloads in the background and asks
 * before restarting. macOS builds are ad-hoc signed, so macOS cannot swap the
 * app in place; those users get a prompt that opens the download page instead.
 */
export function installUpdater(): void {
  // Development runs have no packaged build to replace.
  if (!app.isPackaged) return

  const isMac = process.platform === 'darwin'
  autoUpdater.autoDownload = !isMac
  autoUpdater.autoInstallOnAppQuit = !isMac

  autoUpdater.on('error', (error) => logWarning('update check failed', error))

  autoUpdater.on('update-available', (info) => {
    if (!isMac) return
    void ask({
      type: 'info',
      buttons: ['Download', 'Later'],
      defaultId: 0,
      cancelId: 1,
      title: 'Update available',
      message: `Ash Studio Recorder ${info.version} is available.`,
      detail: 'Download the new version from the releases page and replace the app.'
    }).then((response) => {
      if (response === 0) void shell.openExternal(LATEST_RELEASE_URL)
    })
  })

  autoUpdater.on('update-downloaded', (info) => {
    // Restarting mid-recording would interrupt the capture, so wait for the
    // next quit, which already saves the session first.
    if (recorderManager.isRecording()) return
    void ask({
      type: 'info',
      buttons: ['Restart now', 'Later'],
      defaultId: 0,
      cancelId: 1,
      title: 'Update ready',
      message: `Version ${info.version} has been downloaded.`,
      detail: 'Restart the app to finish installing it.'
    }).then((response) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })

  const check = (): void => {
    autoUpdater.checkForUpdates().catch((error: unknown) => logWarning('check failed', error))
  }

  check()
  setInterval(check, CHECK_INTERVAL_MS).unref()
}
