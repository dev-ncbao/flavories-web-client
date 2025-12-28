import {
    Box,
    Button,
    Card,
    CircularProgress,
    IconButton,
    Stack,
    Table,
    Typography,
    useTheme
} from '@mui/joy';
import { Edit, Trash2, AlertCircle } from 'lucide-react';
import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { recipeService } from '../../services/recipe/recipe.service';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import { formatDate } from '../../utils/dateUtils';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from '@mui/joy';

export default function MyRecipes(): JSX.Element {
    const theme = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();
    const [recipes, setRecipes] = useState<RecipeDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        if (user?.roleId !== 1) {
            navigate('/');
            return;
        }
        loadRecipes();
    }, [user, navigate]);

    const loadRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await recipeService.getUserRecipes();
            setRecipes(response.data);
        } catch (err) {
            setError('Failed to load recipes. Please try again.');
            console.error('Error loading recipes:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (recipeId: number) => {
        navigate(`/recipe/${recipeId}/detail`);
    };

    const handleDelete = async (recipeId: number) => {
        if (!confirm('Are you sure you want to delete this recipe?')) {
            return;
        }

        try {
            setDeletingId(recipeId);
            await recipeService.deleteRecipe(recipeId);
            enqueueSnackbar('Recipe deleted successfully', { variant: 'success' });
            setRecipes(recipes.filter((r) => r.recipeId !== recipeId));
        } catch (err) {
            enqueueSnackbar('Failed to delete recipe', { variant: 'error' });
            console.error('Error deleting recipe:', err);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '400px' }}
            >
                <CircularProgress size="lg" />
            </Stack>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert
                    color="danger"
                    startDecorator={<AlertCircle />}
                    sx={{ borderRadius: theme.vars.radius.lg }}
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography level="h2">My Recipes</Typography>
                <Button
                    onClick={() => navigate('/recipe/create')}
                    size="lg"
                    sx={{ borderRadius: theme.vars.radius.lg }}
                >
                    Create New Recipe
                </Button>
            </Stack>

            {recipes.length === 0 ? (
                <Card
                    variant="outlined"
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: theme.vars.radius.lg
                    }}
                >
                    <Typography level="body-lg" sx={{ color: 'neutral.500' }}>
                        You haven't created any recipes yet.
                    </Typography>
                </Card>
            ) : (
                <Card
                    variant="outlined"
                    sx={{ borderRadius: theme.vars.radius.lg, overflow: 'auto' }}
                >
                    <Table
                        aria-label="My recipes table"
                        stickyHeader
                        sx={{
                            '& thead th': {
                                backgroundColor: 'background.surface',
                                fontWeight: 'lg',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1
                            },
                            '& tbody tr:hover': {
                                backgroundColor: 'neutral.50'
                            }
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>ID</th>
                                <th style={{ width: '40%' }}>Name</th>
                                <th style={{ width: '25%' }}>Created Date</th>
                                <th style={{ width: '25%', textAlign: 'center' }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map((recipe) => (
                                <tr key={recipe.recipeId}>
                                    <td>
                                        <Typography level="body-md">
                                            {recipe.recipeId}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-md" fontWeight="md">
                                            {recipe.name}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-md">
                                            {formatDate(recipe.createdAt)}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            justifyContent="center"
                                        >
                                            <IconButton
                                                variant="soft"
                                                color="primary"
                                                size="sm"
                                                onClick={() =>
                                                    handleEdit(recipe.recipeId)
                                                }
                                                sx={{
                                                    borderRadius: theme.vars.radius.md
                                                }}
                                            >
                                                <Edit size={16} />
                                            </IconButton>
                                            <IconButton
                                                variant="soft"
                                                color="danger"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(recipe.recipeId)
                                                }
                                                disabled={
                                                    deletingId === recipe.recipeId
                                                }
                                                sx={{
                                                    borderRadius: theme.vars.radius.md
                                                }}
                                            >
                                                {deletingId === recipe.recipeId ? (
                                                    <CircularProgress size="sm" />
                                                ) : (
                                                    <Trash2 size={16} />
                                                )}
                                            </IconButton>
                                        </Stack>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}
        </Stack>
    );
}

