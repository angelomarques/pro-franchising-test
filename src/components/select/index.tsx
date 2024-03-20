import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import styles from "./select.module.css";

interface Props {
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export const Select = ({ placeholder, options, onChange }: Props) => (
  <SelectPrimitive.Root onValueChange={onChange}>
    <SelectPrimitive.Trigger className={styles.selectTrigger}>
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon>
        <ChevronDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={styles.selectContent}>
        <SelectPrimitive.Viewport className={styles.selectViewport}>
          {options.map((item) => (
            <SelectPrimitive.Item
              key={item.value}
              className={styles.selectItem}
              value={item.value}
            >
              <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);
