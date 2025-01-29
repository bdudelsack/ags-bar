import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import Clock from "./Clock"
import SystemTray from "./SystemTray"
import ClientTitle from "./ClientTitle"
import Workspaces from "./Workspaces"
import BatteryLevel from "./BatteryLevel"
import Volume from "./Volume"

function Left({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
    return (
        <box spacing={8}>
            <Workspaces gdkmonitor={gdkmonitor} />
        </box>
    )
}

function Center({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
    return (
        <box spacing={8}>
            <ClientTitle />
        </box>
    )
}

function Right({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
    return (
        <box spacing={8} halign={Gtk.Align.END}>
            <Volume />
            <BatteryLevel />
            <Clock />
            <SystemTray />
        </box>
    )
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        visible
        className="bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox
            className="centerbox"
            marginStart={10}
            marginEnd={10}
            marginTop={10}
            startWidget={<Left gdkmonitor={gdkmonitor} />}
            centerWidget={<Center gdkmonitor={gdkmonitor} />}
            endWidget={<Right gdkmonitor={gdkmonitor} />}
        >
        </centerbox>
    </window>
}
