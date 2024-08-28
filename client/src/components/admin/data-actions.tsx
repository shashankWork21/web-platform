import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { AiFillEdit, AiFillDelete, AiOutlineSetting } from "react-icons/ai";
import { MdPowerSettingsNew } from "react-icons/md";

export default function DataActions(props: any) {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button className="flex items-center space-x-2 group">
          <AiOutlineSetting className="w-5 h-5" />
          <span className="hidden group-hover:block">Actions</span>
        </Button>
      </PopoverHandler>
      <PopoverContent>
        <div className="flex flex-row items-center justify-between space-x-3">
          {props.isDisabled ? (
            <form action={props.enableAction}>
              <Button
                type="submit"
                size="sm"
                color="indigo"
                className="flex items-center space-x-2 group"
              >
                <MdPowerSettingsNew className="w-4 h-4" />
                <span className="hidden group-hover:block">Enable</span>
              </Button>
            </form>
          ) : (
            <>
              <Button
                size="sm"
                onClick={() => {
                  props.setEdit(!props.edit);
                }}
                className="flex items-center space-x-2 group"
              >
                <AiFillEdit className="w-4 h-4" />
                <span className="hidden group-hover:block">Edit</span>
              </Button>
              <form action={props.disableAction}>
                <Button
                  type="submit"
                  size="sm"
                  variant="outlined"
                  color="indigo"
                  className="flex items-center space-x-2 group"
                >
                  <MdPowerSettingsNew className="w-4 h-4" />
                  <span className="hidden group-hover:block">Disable</span>
                </Button>
              </form>
            </>
          )}
          <form action={props.deleteAction}>
            <Button
              type="submit"
              color="red"
              size="sm"
              className="flex items-center space-x-2 group"
            >
              <AiFillDelete className="w-4 h-4" />
              <span className="hidden group-hover:block">Delete</span>
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
