import React, { FC } from "react";
import { Collapse, Flex } from "antd";
import { TableFiltersProperties } from "../table.model";

export const TableFilters: FC<TableFiltersProperties> = ({ filterFields }) => {
  return (
    <Collapse
      ghost
      style={{ textAlign: "left" }}
      items={[
        {
          key: "1",
          label: "Filters",
          children: (
            <Flex
              key="filters-container"
              flex="wrap"
              align="center"
              justify="space-between"
            >
              {filterFields.map((filter) => filter.render())}
            </Flex>
          ),
        },
      ]}
    />
  );
};
