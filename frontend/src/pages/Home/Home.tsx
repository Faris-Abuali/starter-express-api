import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

interface HomeProps {
}

const Home: FC<HomeProps> = (props) => {

    return (
        <Stack gap={2}>
            <Typography variant="h1">
                Protected Route🔐
            </Typography>
            <Typography variant="h2">
                authenticated user required ✅👤
            </Typography>
        </Stack>
    );
};

export default Home;
