import { useEffect, useRef, useState } from 'react'

// inspired by: https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
export function useIntersect<T extends Element>({
    root = null,
    rootMargin = '0px',
    threshold = 0,
}: IntersectionObserverInit) {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
    //Quirk with the useRef API in typescript
    const [node, setNode] = useState<T | null>(null)
    const observer = useRef<null | IntersectionObserver>(null)

    useEffect(() => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(
            ([entry]) => setEntry(entry),
            {
                root,
                rootMargin,
                threshold,
            }
        )
        const { current } = observer
        if (node) current.observe(node)
        return () => current.disconnect()
    }, [node, root, rootMargin, threshold])

    //Typescript is not ready for this
    return [setNode, entry] as const
}
