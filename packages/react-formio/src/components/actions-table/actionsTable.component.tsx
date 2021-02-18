import classnames from "classnames";
import React, { useState } from "react";
import noop from "lodash/noop";
import { FormSchema } from "../../interfaces";
import { iconClass } from "../../utils/iconClass";
import { Select } from "../select/select.component";
import { Table, TableProps } from "../table/table.component";

export type ActionsTableProps<Data extends Record<string, unknown> = {}> = Omit<
  TableProps<FormSchema>,
  "columns"
> & {
  onAddAction?: (action: string) => void;
  actions?: { label: string; value: string }[];
};

export function ActionsTable({
  disableFilters = true,
  disablePagination = true,
  actions = [],
  onAddAction = noop,
  ...props
}: ActionsTableProps) {
  const { i18n = (f: string) => f } = props;
  const [currentAction, setAction] = useState("");

  const columns = React.useMemo(() => {
    return [
      {
        Header: i18n("Actions"),
        accessor: "title",
        id: "title"
      }
    ];
  }, []);

  return (
    <Table
      {...props}
      disableFilters={disableFilters}
      disablePagination={disablePagination}
      columns={columns}
    >
      {actions.length ? (
        <div className={"pagination-group"}>
          <Select
            name={"actions"}
            value={currentAction}
            choices={[{ label: i18n("Select an action"), value: "" }].concat(
              actions
            )}
            onChange={(name: string, action: string) => setAction(action)}
          />
          <div className={"pl-3"}>
            <button
              disabled={currentAction === ""}
              className={"btn btn-success"}
              onClick={() => currentAction && onAddAction(currentAction)}
            >
              <i className={classnames(iconClass(undefined, "plus"), "mr-1")} />{" "}
              {i18n("Add action")}
            </button>
          </div>
        </div>
      ) : null}
    </Table>
  );
}