import { bind } from "astal"
import { Astal, Gdk } from "astal/gtk3"
import Tray from "gi://AstalTray"

export default function SystemTray() {
    const tray = Tray.get_default()

    const handleClick = (item: Tray.TrayItem) => (_, e: Astal.ClickEvent) => {
    }

    const items = bind(tray, "items").as(items => items.map(
        item => (
            <menubutton
                margin={0}
                cursor="pointer"
                tooltipMarkup={bind(item, "tooltipMarkup")}
                actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
                menuModel={bind(item, "menuModel")}
            // onClick={handleClick(item)}
            >
                <icon gicon={bind(item, "gicon")} className="systemtray-icon" />
            </menubutton>
        )
    ))

    // return <box className="SysTray">
    //     {bind(tray, "items").as(items => items.map(item => (
    //         <menubutton
    //             tooltipMarkup={bind(item, "tooltipMarkup")}
    //             actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
    //             menuModel={bind(item, "menuModel")}>
    //             <icon gicon={bind(item, "gicon")} />
    //         </menubutton>
    //     )))}
    // </box>

    return (
        <box className="systemtray box p-1">
            {items}
        </box>
    )
}
