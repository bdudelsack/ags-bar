import { bind } from "astal"
import Battery from "gi://AstalBattery"

export default function BatteryLebel() {
    const bat = Battery.get_default()

    return <box className="battery box p-1"
        visible={bind(bat, "isPresent")}>
        <icon icon={bind(bat, "batteryIconName")} />
        <label label={bind(bat, "percentage").as(p =>
            `${Math.floor(p * 100)} %`
        )} />
    </box>
}
