import { bind } from "astal"
import { Gtk } from "astal/gtk3"
import Tray from "gi://AstalTray"

export default function SystemTray() {
    const tray = Tray.get_default()


    const items = bind(tray, "items").as(items => items.map(
        item => (
            <menubutton
                margin={0}
                cursor="pointer"
                tooltipMarkup={bind(item, "tooltipMarkup")}
                actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
                menuModel={bind(item, "menuModel")}
                direction={Gtk.ArrowType.DOWN}
                usePopover={false}
            >
                <icon gicon={bind(item, "gicon")} className="systemtray-icon" />
            </menubutton>
        )
    ))

    return (
        <box className="systemtray box p-1">
            {items}
        </box>
    )
}
