import * as React from "react";
import { Paper, List, ListItemButton, ListItemIcon, ListItemText, Checkbox, Button, Grid, Typography } from "@mui/material";

function not(a, b) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
    return a.filter((value) => b.includes(value));
}

export default function TransferList({ leftUsers, rightUsers }) {
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(leftUsers);
    const [right, setRight] = React.useState(rightUsers);

    // Ensure state updates when props change
    React.useEffect(() => {
        setLeft(leftUsers);
        setRight(rightUsers);
    }, [leftUsers, rightUsers]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (items, title) => (
        <Paper sx={{ width: "24vw", height: "64vh", overflow: "auto" }}>
            <Typography variant="h6" sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}>
                {title}
            </Typography>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.id}-label`;

                    return (
                        <ListItemButton key={value.id} role="listitem" onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.includes(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Grid item>{customList(left, "Available Users")}</Grid>

            <Grid item>
                <Grid container direction="column" sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Button
                        sx={{ my: 1 }}
                        variant="contained"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 1 }}
                        variant="contained"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 1 }}
                        variant="contained"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 1 }}
                        variant="contained"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>

            <Grid item>{customList(right, "Selected Users")}</Grid>
        </Grid>
    );
}
