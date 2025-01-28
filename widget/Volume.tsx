
import { bind } from "astal"
import Wp from "gi://AstalWp"

function Volume() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!

    return <box className="volume box p-1" css="min-width: 180px">
        <icon icon={bind(speaker, "volumeIcon")} marginEnd={10} />
        <slider
            hexpand
            onDragged={({ value }) => speaker.volume = value}
            value={bind(speaker, "volume")}
        />
    </box>
}

export default Volume
