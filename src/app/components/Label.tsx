"use client"

interface LabelProps {
    text: string,
}
export default function Label(props: LabelProps) {
    return (
        <label>
            {props.text}
        </label>
    );
}