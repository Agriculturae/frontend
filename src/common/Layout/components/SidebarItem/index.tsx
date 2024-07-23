import { Ripple } from "primereact/ripple";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import "./SidebarItem.css";

interface SidebarItemProps {
  expandable?: boolean;
  title: string;
  icon: React.ReactNode;
  to: string;
  subItems?: { label: string; path: string }[];
}

const SidebarItem = ({
  expandable,
  title,
  icon,
  to,
  subItems,
}: SidebarItemProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {expandable ? (
        <Accordion className="w-full p-0">
          <AccordionTab
            header={
              <div
                className={`relative flex items-center justify-center w-full h-[40px] border border-light hover:shadow hover:border-primary rounded-lg text-primary cursor-pointer transition-all box-border p-ripple`}
                onClick={handleAccordionToggle}
              >
                <span className="absolute top-2 left-3 text-2xl text-primary">
                  {icon}
                </span>
                <span className="ml-2 text-lg font-[500]">{title}</span>
                <span
                  className={`transition-transform duration-300 ${
                    expanded ? "rotate-180" : "rotate-0"
                  } absolute top-3 right-3 text-md text-primary`}
                >
                  <FaChevronDown />
                </span>
                <Ripple
                  pt={{
                    root: { style: { background: "#1c603a" } },
                  }}
                />
              </div>
            }
          >
            <ul className="flex flex-col items-center space-y-3 list-none p-3 mt-1 ml-5">
              {subItems?.map((item, index) => (
                <li
                  className="flex items-center justify-start w-full p-1 space-x-3 cursor-pointer border-b border-light hover:border-primary hover:shadow rounded-lg box-border transition-all p-ripple"
                  key={index}
                  onClick={(e) => {
                    navigate(item.path);
                    e.preventDefault();
                  }}
                >
                  <FaChevronRight className="text-md" />
                  <span className="relative text-primary font-medium text-lg font-montserrat">
                    {item.label}
                  </span>
                  <Ripple
                    pt={{
                      root: { style: { background: "#1c603a" } },
                    }}
                  />
                </li>
              ))}
            </ul>
          </AccordionTab>
        </Accordion>
      ) : (
        <div
          className="relative flex items-center justify-center w-full h-[40px] border border-light hover:shadow hover:border-primary rounded-lg text-primary cursor-pointer transition-all box-border p-ripple"
          onClick={() => {
            navigate(to);
          }}
        >
          <span className="absolute top-2 left-3 text-2xl">{icon}</span>
          <span className="ml-2 text-lg font-[500]">{title}</span>
          <Ripple
            pt={{
              root: { style: { background: "#1c603a" } },
            }}
          />
        </div>
      )}
    </>
  );
};

export default SidebarItem;
