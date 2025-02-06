import { bind } from "astal"
import { Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"

interface WorkspacesProps {
    gdkmonitor: Gdk.Monitor
}

function getGdkMonitorId(gMonitor: Gdk.Monitor): number {
    let gMonitorID: number
    for (gMonitorID = 0; true; gMonitorID++) {
        if (Gdk.Display.get_default()?.get_monitor(gMonitorID) === gMonitor) {
            break
        }
    }
    return gMonitorID
}

export default function Workspaces({ gdkmonitor }: WorkspacesProps) {
    const hypr = Hyprland.get_default()
    const monitorId = getGdkMonitorId(gdkmonitor)

    return <box className="workspaces box">
        {bind(hypr, "workspaces").as(wss => wss
            .filter(ws => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
            .filter(ws => ws.monitor?.id == monitorId)
            .sort((a, b) => a.id - b.id)
            .map(ws => {
                const workspace = bind(hypr, "focusedWorkspace")
                const currentMonitorClassName = monitorId != ws.monitor?.id ? "dimmed" : ""
                const className = workspace.as(fw => ws === fw ? "focused" : currentMonitorClassName)

                return (
                    <>
                        <button
                            className={className}
                            onClicked={() => ws.focus()}>
                            {ws.id}
                        </button>
                    </>
                )
            })
        )}
    </box>
}
