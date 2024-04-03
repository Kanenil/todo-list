import classNames from "classnames";

interface InputPropTypes {
    value: any,
    error: boolean,
    touched: boolean,
    onChange: (e: any) => void,
    name: string,
    title: string,
    className: string,
    children: any,
    errorChildren: any
}

const Textarea = ({
                   value,
                   error = false,
                   onChange,
                   name,
                   title,
                   className = "pt-[5px] pb-[10px] pr-[20px] gap-[5px]",
                   errorChildren,
    touched
               }: InputPropTypes) => {

    return (
        <div className={className}>
            <label htmlFor={name} className="font-jost text-[#2D2A33]">{title}</label>

            <textarea
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                rows={4}
                className={classNames("w-full rounded-[4px] border-[0.5px] py-[5px] px-2.5 text-[#7D7D7D] text-sm resize-none", {
                    "border-[#556DA9]": !error,
                    "border-[#9E0F20]": error && touched
                })}
            />
            {error && errorChildren}
        </div>
    )
}
export default Textarea;