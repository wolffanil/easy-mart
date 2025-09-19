import { createContext, useContext, useState, type ReactNode } from "react";
import styles from "./Tabs.module.scss";
import Button from "../Button/Button";
import { cn } from "@/shared/lib";

interface TabsContextType {
  activeTab: string;
  handleChangeActiveTab: (tab: string) => void;
}

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  onChange?: () => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function Tabs({ defaultValue, children, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleChangeActiveTab = (tab: string) => {
    setActiveTab(tab);
    if (onChange) {
      onChange();
    }
  };

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        handleChangeActiveTab,
      }}
    >
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) throw new Error("context must be within Tabs");

  return context;
};

interface TabsListProps {
  children: ReactNode;
}

const TabsList = ({ children }: TabsListProps) => {
  return <div className={styles.list}>{children}</div>;
};

interface TabTriggerProps {
  value: string;
  children: ReactNode;
}

const TabTrigger = ({ value, children }: TabTriggerProps) => {
  const context = useTabs();

  const isActive = context.activeTab === value;

  const handleClick = () => {
    context.handleChangeActiveTab(value);
  };

  return (
    <Button
      type="button"
      theme={isActive ? "outline" : "tertiary"}
      form="rounded"
      onClick={handleClick}
      className={cn(styles.trigger, { [styles.active]: isActive })}
    >
      {children}
    </Button>
  );
};

interface TabContentProps {
  value: string;
  children: ReactNode;
}

const TabContent = ({ value, children }: TabContentProps) => {
  const context = useTabs();

  const isActive = context.activeTab === value;

  if (!isActive) return null;

  return <div className={styles.content}>{children}</div>;
};

Tabs.List = TabsList;
Tabs.Content = TabContent;
Tabs.Trigger = TabTrigger;

export default Tabs;
