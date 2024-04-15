import { usePathname } from "next/navigation";
import navConfig, { NavConfigType } from "./config-navigation";
import { Box, ListItemButton, alpha } from "@mui/material";
import React, { MouseEvent, useMemo, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/router";

type Props = {
  item: NavConfigType;
  className?: string;
  depth?: number;
};

export const NavItem: React.FC<Props> = ({ item, className, depth = 0 }) => {
  const pathname = usePathname();

  const router = useRouter();

  const [openChildren, setOpenChildren] = useState(true);

  const hasItem = useMemo(() => {
    return item.children && item.children.length > 0;
  }, [item.children]);

  const active = item.path === pathname;

  return (
    <>
      <ListItemButton
        className={className}
        // href={item.path}
        onClick={(event) => {
          if (item.children && item.children.length > 0) {
            event.preventDefault();
            setOpenChildren(!openChildren);
          } else {
            router.push(item.path);
          }
        }}
        sx={{
          paddingLeft: 5 * depth,
          minHeight: 44,
          borderRadius: 0.75,
          typography: "body2",
          color: "text.secondary",
          textTransform: "capitalize",
          fontWeight: "fontWeightMedium",
          ...(active && {
            color: "primary.main",
            fontWeight: "fontWeightSemiBold",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box
          component="span"
          sx={{
            width: 24,
            height: 24,
            mr: 2,
          }}
        >
          {item.icon}
        </Box>
        <Box component="span">{item.title}</Box>
        {hasItem && <Box>{openChildren ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</Box>}
      </ListItemButton>
      {openChildren &&
        item.children &&
        item.children.length > 0 &&
        item.children.map((childrenItem, childrenIndex) => {
          return (
            <NavItem item={childrenItem} key={`${childrenItem.title}_${childrenIndex}`} depth={depth + 1} />
            // <Box key={childrenItem.title}>
            // 	<ListItemButton
            // 		href={childrenItem.path}
            // 		sx={{
            // 			minHeight: 44,
            // 			paddingLeft: 5,
            // 			borderRadius: 0.75,
            // 			typography: 'body2',
            // 			color: 'text.secondary',
            // 			textTransform: 'capitalize',
            // 			fontWeight: 'fontWeightMedium',
            // 			...(active && {
            // 				color: 'primary.main',
            // 				fontWeight: 'fontWeightSemiBold',
            // 				bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
            // 				'&:hover': {
            // 					bgcolor: theme => alpha(theme.palette.primary.main, 0.16),
            // 				},
            // 			}),
            // 		}}
            // 	>
            // 		<Box
            // 			component="span"
            // 			sx={{
            // 				width: 24,
            // 				height: 24,
            // 				mr: 2,
            // 			}}
            // 		>
            // 			{childrenItem.icon}
            // 		</Box>
            // 		<Box component="span">{childrenItem.title}</Box>
            // 	</ListItemButton>
            // </Box>
          );
        })}
    </>
  );
};

NavItem.displayName = "NavItem";
