import React, { useContext, useState } from "react";
import { Accordion, AccordionContent, AccordionTitle, Button, Header } from "semantic-ui-react";
import './Dashboard.css';
import { AuthContext } from "../../context/AuthContext";

const FilterSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const data = useContext(AuthContext);
    const { filterStatus, filterPriority, dueDate, handleFilterAction } = data;

    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex);
    }

    const filterAction = (value, type) => {
        handleFilterAction(value, type);
    }

    return(
        <>
        <div className="filterSection">
        <Accordion fluid className="filterAccordion">
        <AccordionTitle
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
          className="accordionheader"
        >
          Filters and Sorting Options
        </AccordionTitle>
        <AccordionContent className="accordionContent" active={activeIndex === 0}>
            <hr/>
            <div>
                <Header as="h4">Filter: Status</Header>
                <div>
                    <Button primary ={filterStatus==="All"} onClick={() => filterAction('All' , 'status')}>All</Button>
                    <Button primary ={filterStatus==="Pending"} onClick={() => filterAction('Pending', 'status')}>Pending</Button>
                    <Button primary ={filterStatus==="Completed"} onClick={() => filterAction('Completed', 'status')}>Completed</Button>
                </div>
            </div>
            <div>
                <Header as="h4">Filter: Priority</Header>
                <div>
                    <Button primary ={filterPriority==="All"} onClick={() => filterAction('All', 'priority')}>All</Button>
                    <Button primary ={filterPriority==="High"} onClick={() => filterAction('High', 'priority')}>High</Button>
                    <Button primary ={filterPriority==="Medium"} onClick={() => filterAction('Medium', 'priority')}>Medium</Button>
                    <Button primary ={filterPriority==="Low"} onClick={() => filterAction('Low', 'priority')}>Low</Button>
                </div>
            </div>
            <div>
                <Header as="h4">Sort By:</Header>
                <div>
                    <Button primary = {dueDate === "Ascending"} onClick={() => filterAction('Ascending', 'sort')}>Due Date Ascending</Button>
                    <Button primary = {dueDate === "Descending"} onClick={() => filterAction('Descending', 'sort')}>Due Date Descending</Button>
                </div>
            </div>
        </AccordionContent>
      </Accordion>
        </div>
        </>
    );
}

export default FilterSection;