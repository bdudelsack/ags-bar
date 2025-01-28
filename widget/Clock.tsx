import { Variable } from "astal"


export default function Clock() {
    const date = Variable("").poll(1000, 'date "+%b %e %H:%M"')
    return <label className="client-title box p-1" label={date()} />
}
