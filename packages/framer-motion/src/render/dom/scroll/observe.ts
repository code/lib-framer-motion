import { cancelFrame, frame, ProgressTimeline } from "motion-dom"

type Update = (progress: number) => void

export function observeTimeline(update: Update, timeline: ProgressTimeline) {
    let prevProgress: number

    const onFrame = () => {
        const { currentTime } = timeline
        const percentage = currentTime === null ? 0 : currentTime.value
        const progress = percentage / 100

        if (prevProgress !== progress) {
            update(progress)
        }

        prevProgress = progress
    }

    frame.update(onFrame, true)

    return () => cancelFrame(onFrame)
}
