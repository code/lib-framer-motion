import {
    animate,
    motion,
    useMotionValue,
    ValueAnimationTransition,
} from "framer-motion"
import { useEffect, useRef } from "react"
import styled from "styled-components"

const Container = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 100px;

    .box {
        width: 100px;
        height: 100px;
        background-color: red;
        opacity: 0;
    }
`

export const App = () => {
    const opacity = useMotionValue(0)

    const waapiRef = useRef<HTMLDivElement>(null)
    const syncRef = useRef<HTMLDivElement>(null)

    const waapiStartTime = useMotionValue("--")
    const syncStartTime = useMotionValue("--")
    const waapiExplicitStartTime = useMotionValue("--")
    const syncExplicitStartTime = useMotionValue("--")

    useEffect(() => {
        const settings: ValueAnimationTransition = {
            duration: 2,
            ease: "linear",
        }

        if (!waapiRef.current) return
        if (!syncRef.current) return

        const waapiAnimation = animate(
            waapiRef.current,
            { opacity: [0, 1] },
            settings
        )
        const syncAnimation = animate(
            syncRef.current,
            { opacity: [0, 1] },
            settings
        )

        const startTime = 101

        const waapiExplicitAnimation = animate(
            waapiRef.current,
            { filter: ["blur(0px)", "blur(1px)"] },
            { ...settings, startTime }
        )
        const syncExplicitAnimation = animate(
            syncRef.current,
            { x: [0, 100] },
            { ...settings, startTime }
        )

        const timeout = setTimeout(() => {
            waapiStartTime.set(
                waapiAnimation.startTime?.toString() ||
                    "waapi start time not available"
            )
            syncStartTime.set(
                syncAnimation.startTime?.toString() ||
                    "sync start time not available"
            )
            waapiExplicitStartTime.set(
                waapiExplicitAnimation.startTime?.toString() ||
                    "waapi explicit start time not available"
            )
            syncExplicitStartTime.set(
                syncExplicitAnimation.startTime?.toString() ||
                    "sync explicit start time not available"
            )
        }, 1000)

        return () => {
            waapiAnimation.stop()
            syncAnimation.stop()
            waapiExplicitAnimation.stop()
            syncExplicitAnimation.stop()
            clearTimeout(timeout)
        }
    }, [])

    return (
        <Container>
            <motion.div
                ref={waapiRef}
                className="box"
                initial={{ opacity: 0 }}
            />
            <motion.div
                ref={syncRef}
                className="box"
                initial={{ opacity: 0, y: 0 }}
                style={{ opacity }}
            />
            <motion.pre
                id="waapi-start-time"
                className="auto-timer waapi-timer"
            >
                {waapiStartTime}
            </motion.pre>
            <motion.pre id="sync-start-time" className="auto-timer sync-timer">
                {syncStartTime}
            </motion.pre>
            <motion.pre
                id="waapi-explicit-start-time"
                className="explicit-timer waapi-timer"
            >
                {waapiExplicitStartTime}
            </motion.pre>
            <motion.pre
                id="sync-explicit-start-time"
                className="explicit-timer sync-timer"
            >
                {syncExplicitStartTime}
            </motion.pre>
        </Container>
    )
}
