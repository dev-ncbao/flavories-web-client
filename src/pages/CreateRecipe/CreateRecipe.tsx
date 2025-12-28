import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Typography,
    useTheme,
    IconButton
} from '@mui/joy';
import { useState, useRef, useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { recipeService } from '../../services/recipe/recipe.service';
import { ingredientService } from '../../services/ingredient/ingredient.service';
import { unitService } from '../../services/unit/unit.service';
import type { IngredientDto } from '../../services/ingredient/ingredient.dto';
import type { UnitDto } from '../../services/unit/unit.dto';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useSnackbar } from '../../hooks/useSnackbar';
import ErrorAlert from '../../components/ErrorAlert';
import BackLink from '../../components/BackLink';
import { Plus, X, Upload } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface RecipeIngredient {
    amount: string;
    ingredientName: string;
    ingredientId: number | null;
    isNewIngredient: boolean;
    unitAbbreviation: string;
    unitId: number | null;
    isNewUnit: boolean;
    unitName?: string; // For new units, we need the full name
}

interface RecipeStep {
    stepNumber: number;
    description: string;
}

export default function CreateRecipe(): JSX.Element {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useAuth();
    const { openSnackbar } = useSnackbar();
    const { error, showError, setError, clearError, handleApiError } =
        useErrorHandler();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
    const [ingredients, setIngredients] = useState<RecipeIngredient[]>([
        { amount: '', ingredientName: '', ingredientId: null, isNewIngredient: false, unitAbbreviation: '', unitId: null, isNewUnit: false }
    ]);
    const [steps, setSteps] = useState<RecipeStep[]>([
        { stepNumber: 1, description: '' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [availableIngredients, setAvailableIngredients] = useState<IngredientDto[]>([]);
    const [availableUnits, setAvailableUnits] = useState<UnitDto[]>([]);
    const [loadingIngredients, setLoadingIngredients] = useState(false);
    const [loadingUnits, setLoadingUnits] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch ingredients and units on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingIngredients(true);
                const ingredientsResponse = await ingredientService.getIngredients();
                setAvailableIngredients(ingredientsResponse.data);
            } catch (err) {
                handleApiError(err);
            } finally {
                setLoadingIngredients(false);
            }

            try {
                setLoadingUnits(true);
                const unitsResponse = await unitService.getUnits();
                setAvailableUnits(unitsResponse.data);
            } catch (err) {
                handleApiError(err);
            } finally {
                setLoadingUnits(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addIngredient = () => {
        setIngredients([
            ...ingredients,
            { amount: '', ingredientName: '', ingredientId: null, isNewIngredient: false, unitAbbreviation: '', unitId: null, isNewUnit: false }
        ]);
    };

    const removeIngredient = (index: number) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((_, i) => i !== index));
        }
    };

    const updateIngredient = (
        index: number,
        field: keyof RecipeIngredient,
        value: string | number | null
    ) => {
        const updated = [...ingredients];
        updated[index] = { ...updated[index], [field]: value };
        setIngredients(updated);
    };

    const handleIngredientSelect = (
        index: number,
        value: IngredientDto | string | null
    ) => {
        const updated = [...ingredients];
        if (typeof value === 'string') {
            // User typed a new ingredient
            updated[index] = {
                ...updated[index],
                ingredientName: value,
                ingredientId: null,
                isNewIngredient: true
            };
        } else if (value && 'ingredientId' in value) {
            // User selected an existing ingredient
            updated[index] = {
                ...updated[index],
                ingredientName: value.name,
                ingredientId: value.ingredientId,
                isNewIngredient: false,
                unitAbbreviation: value.unit.abbreviation,
                unitId: value.unit.unitId,
                isNewUnit: false
            };
        } else {
            // Cleared
            updated[index] = {
                ...updated[index],
                ingredientName: '',
                ingredientId: null,
                isNewIngredient: false,
                unitAbbreviation: '',
                unitId: null,
                isNewUnit: false
            };
        }
        setIngredients(updated);
    };

    const handleUnitSelect = (index: number, value: UnitDto | string | null) => {
        const updated = [...ingredients];
        if (typeof value === 'string') {
            // User typed a new unit - try to parse abbreviation and name
            // If format is "abbr (name)", parse it, otherwise use as abbreviation
            const match = value.match(/^(.+?)\s*\((.+?)\)$/);
            if (match) {
                updated[index] = {
                    ...updated[index],
                    unitAbbreviation: match[1].trim(),
                    unitName: match[2].trim(),
                    unitId: null,
                    isNewUnit: true
                };
            } else {
                // Just abbreviation, use it as both abbreviation and name
                updated[index] = {
                    ...updated[index],
                    unitAbbreviation: value.trim(),
                    unitName: value.trim(),
                    unitId: null,
                    isNewUnit: true
                };
            }
        } else if (value && 'unitId' in value) {
            // User selected an existing unit
            updated[index] = {
                ...updated[index],
                unitAbbreviation: value.abbreviation,
                unitId: value.unitId,
                isNewUnit: false,
                unitName: undefined
            };
        } else {
            // Cleared
            updated[index] = {
                ...updated[index],
                unitAbbreviation: '',
                unitId: null,
                isNewUnit: false,
                unitName: undefined
            };
        }
        setIngredients(updated);
    };

    const addStep = () => {
        setSteps([
            ...steps,
            { stepNumber: steps.length + 1, description: '' }
        ]);
    };

    const removeStep = (index: number) => {
        if (steps.length > 1) {
            const updated = steps.filter((_, i) => i !== index);
            // Re-number steps
            const renumbered = updated.map((step, i) => ({
                ...step,
                stepNumber: i + 1
            }));
            setSteps(renumbered);
        }
    };

    const updateStep = (index: number, description: string) => {
        const updated = [...steps];
        updated[index] = { ...updated[index], description };
        setSteps(updated);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }
            setThumbnailFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setThumbnailFile(null);
        setThumbnailPreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async () => {
        // Validate recipe name (not null or whitespace)
        if (!name || !name.trim()) {
            setError('Recipe name is required');
            return;
        }

        // Validate description (not null or whitespace)
        if (!description || !description.trim()) {
            setError('Description is required');
            return;
        }

        // Validate thumbnail image
        if (!thumbnailFile) {
            setError('Thumbnail image is required');
            return;
        }

        // Filter out completely empty ingredients and validate
        const filledIngredients = ingredients.filter(
            (ing) =>
                (ing.amount && ing.amount.trim().length > 0) ||
                (ing.ingredientName && ing.ingredientName.trim().length > 0) ||
                (ing.unitAbbreviation && ing.unitAbbreviation.trim().length > 0)
        );

        // Validate at least 1 ingredient
        if (filledIngredients.length === 0) {
            setError('At least one ingredient is required');
            return;
        }

        // Validate ingredients fields - all filled ingredients must be complete
        // Allow custom ingredient names and units as long as they're not empty/whitespace
        const invalidIngredients = filledIngredients.some(
            (ing) => {
                const hasAmount = ing.amount && ing.amount.trim().length > 0;
                const hasIngredientName = ing.ingredientName && ing.ingredientName.trim().length > 0;
                const hasUnitAbbreviation = ing.unitAbbreviation && ing.unitAbbreviation.trim().length > 0;
                // For new units, unitAbbreviation is sufficient (unitName is optional, will use abbreviation if not provided)
                // For existing units, we don't need to check unitName
                
                return !hasAmount || !hasIngredientName || !hasUnitAbbreviation;
            }
        );
        if (invalidIngredients) {
            setError('Please fill in all ingredient fields for each ingredient');
            return;
        }

        // Filter out completely empty steps and validate
        const filledSteps = steps.filter(
            (step) => step.description && step.description.trim().length > 0
        );

        // Validate at least 1 step
        if (filledSteps.length === 0) {
            setError('At least one step is required');
            return;
        }

        if (!user || !user.userId) {
            setError('You must be logged in to create a recipe');
            return;
        }

        try {
            setIsLoading(true);
            // Convert file to base64 data URL for thumbnailUrl
            const thumbnailUrl = thumbnailPreview;

            // Process ingredients: create new units and ingredients if needed
            const processedIngredients = await Promise.all(
                filledIngredients.map(async (ing) => {
                    let finalUnitId = ing.unitId;
                    let finalIngredientId = ing.ingredientId;

                    // Create new unit if needed
                    if (ing.isNewUnit && !finalUnitId) {
                        try {
                            const unitResponse = await unitService.createUnit({
                                name: ing.unitName || ing.unitAbbreviation,
                                abbreviation: ing.unitAbbreviation
                            });
                            finalUnitId = unitResponse.data.unitId;
                            // Update available units list
                            setAvailableUnits((prev) => [...prev, unitResponse.data]);
                        } catch (err) {
                            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                            throw new Error(`Failed to create unit: ${ing.unitAbbreviation}. ${errorMessage}`);
                        }
                    }

                    // Create new ingredient if needed
                    if (ing.isNewIngredient && !finalIngredientId && finalUnitId) {
                        try {
                            const ingredientResponse = await ingredientService.createIngredient({
                                name: ing.ingredientName,
                                unitId: finalUnitId
                            });
                            finalIngredientId = ingredientResponse.data.ingredientId;
                            // Update available ingredients list
                            setAvailableIngredients((prev) => [...prev, ingredientResponse.data]);
                        } catch (err) {
                            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                            throw new Error(`Failed to create ingredient: ${ing.ingredientName}. ${errorMessage}`);
                        }
                    }

                    if (!finalIngredientId || !finalUnitId) {
                        throw new Error('Missing ingredient or unit ID');
                    }

                    return {
                        ingredientId: finalIngredientId,
                        amount: Number(ing.amount),
                        ingredientName: ing.ingredientName,
                        unit: {
                            unitId: finalUnitId,
                            abbreviation: ing.unitAbbreviation
                        }
                    };
                })
            );

            await recipeService.createRecipe({
                userId: user.userId,
                name,
                description,
                thumbnailUrl,
                ingredients: processedIngredients,
                steps: filledSteps.map((step, index) => ({
                    stepNumber: index + 1,
                    description: step.description
                }))
            });
            openSnackbar('Recipe created successfully!', 'success');
            navigate('/recipe/summary');
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'inherit'}
            width={'inherit'}
            paddingX={8}
            paddingY={4}
        >
            <Stack
                justifyContent={'center'}
                alignItems={'center'}
                width={'100%'}
                maxWidth={1200}
            >
                <Stack alignSelf={'flex-start'}>
                    <BackLink
                        onBack={() => {
                            if (window.history.length > 1) {
                                navigate(-1);
                            } else {
                                navigate('/recipe/summary');
                            }
                        }}
                    />
                </Stack>
                <Box height={32} />
                <Stack>
                    <Typography
                        level={'h2'}
                        fontWeight={900}
                    >
                        Create a new
                    </Typography>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={1}
                    >
                        <img
                            src="/src/assets/burger.png"
                            alt="https://www.flaticon.com/free-icons/burger"
                            width={32}
                            height={32}
                        />
                        <Typography
                            level={'h3'}
                            fontWeight={900}
                            textColor={'success.600'}
                        >
                            Recipe
                        </Typography>
                    </Stack>
                </Stack>
                <Box height={24} />
                <Stack
                    width={'100%'}
                    spacing={3}
                >
                    {/* Basic Information */}
                    <Stack spacing={2}>
                        <Typography
                            level={'title-lg'}
                            fontWeight={600}
                        >
                            Basic Information
                        </Typography>
                        <FormControl>
                            <FormLabel>Recipe Name: </FormLabel>
                            <Input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Enter recipe name"
                                sx={{
                                    borderRadius: theme.vars.radius.md
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description: </FormLabel>
                            <Input
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="Enter recipe description"
                                sx={{
                                    borderRadius: theme.vars.radius.md
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Thumbnail Image: </FormLabel>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            {thumbnailPreview ? (
                                <Stack spacing={1}>
                                    <Box
                                        component="img"
                                        src={thumbnailPreview}
                                        alt="Thumbnail preview"
                                        sx={{
                                            width: '100%',
                                            maxWidth: 400,
                                            maxHeight: 300,
                                            objectFit: 'cover',
                                            borderRadius: theme.vars.radius.md,
                                            border: `1px solid ${theme.vars.palette.neutral.outlinedBorder}`
                                        }}
                                    />
                                    <Button
                                        size="sm"
                                        color="danger"
                                        variant="soft"
                                        startDecorator={<X size={16} />}
                                        onClick={handleRemoveImage}
                                        sx={{
                                            borderRadius: theme.vars.radius.md,
                                            alignSelf: 'flex-start'
                                        }}
                                    >
                                        Remove Image
                                    </Button>
                                </Stack>
                            ) : (
                                <Button
                                    component="label"
                                    variant="outlined"
                                    startDecorator={<Upload size={16} />}
                                    sx={{
                                        borderRadius: theme.vars.radius.md,
                                        justifyContent: 'flex-start'
                                    }}
                                >
                                    Upload Image
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </Button>
                            )}
                        </FormControl>
                    </Stack>

                    {/* Ingredients */}
                    <Stack spacing={2}>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Typography
                                level={'title-lg'}
                                fontWeight={600}
                            >
                                Ingredients
                            </Typography>
                            <Button
                                size="sm"
                                startDecorator={<Plus size={16} />}
                                onClick={addIngredient}
                                sx={{
                                    borderRadius: theme.vars.radius.md
                                }}
                            >
                                Add Ingredient
                            </Button>
                        </Stack>
                        {ingredients.map((ingredient, index) => (
                            <Stack
                                key={index}
                                direction={'row'}
                                spacing={2}
                                alignItems={'flex-start'}
                            >
                                <FormControl sx={{ flex: 1 }}>
                                    <FormLabel>Amount: </FormLabel>
                                    <Input
                                        value={ingredient.amount}
                                        onChange={(event) =>
                                            updateIngredient(
                                                index,
                                                'amount',
                                                event.target.value
                                            )
                                        }
                                        placeholder="Amount"
                                        type="number"
                                        sx={{
                                            borderRadius: theme.vars.radius.md
                                        }}
                                    />
                                </FormControl>
                                <FormControl sx={{ flex: 2 }}>
                                    <FormLabel>Ingredient Name: </FormLabel>
                                    <Autocomplete
                                        freeSolo
                                        placeholder="Select or type ingredient name"
                                        options={availableIngredients}
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option.name
                                        }
                                        value={
                                            ingredient.isNewIngredient
                                                ? ingredient.ingredientName
                                                : availableIngredients.find(
                                                      (ing) => ing.ingredientId === ingredient.ingredientId
                                                  ) || null
                                        }
                                        onChange={(_, newValue) => {
                                            handleIngredientSelect(index, newValue);
                                        }}
                                        loading={loadingIngredients}
                                        sx={{
                                            borderRadius: theme.vars.radius.md
                                        }}
                                    />
                                </FormControl>
                                <FormControl sx={{ flex: 1 }}>
                                    <FormLabel>Unit: </FormLabel>
                                    <Autocomplete
                                        freeSolo
                                        placeholder="Select or type unit (e.g., 'g' or 'g (gram)')"
                                        options={availableUnits}
                                        getOptionLabel={(option) =>
                                            typeof option === 'string'
                                                ? option
                                                : `${option.abbreviation} (${option.name})`
                                        }
                                        value={
                                            ingredient.isNewUnit
                                                ? ingredient.unitName
                                                    ? `${ingredient.unitAbbreviation} (${ingredient.unitName})`
                                                    : ingredient.unitAbbreviation
                                                : availableUnits.find(
                                                      (unit) => unit.unitId === ingredient.unitId
                                                  ) || null
                                        }
                                        onChange={(_, newValue) => {
                                            handleUnitSelect(index, newValue);
                                        }}
                                        loading={loadingUnits}
                                        sx={{
                                            borderRadius: theme.vars.radius.md
                                        }}
                                    />
                                </FormControl>
                                {ingredients.length > 1 && (
                                    <IconButton
                                        color="danger"
                                        variant="soft"
                                        onClick={() => removeIngredient(index)}
                                        sx={{
                                            borderRadius: theme.vars.radius.md,
                                            mt: 3.5
                                        }}
                                    >
                                        <X size={18} />
                                    </IconButton>
                                )}
                            </Stack>
                        ))}
                    </Stack>

                    {/* Steps */}
                    <Stack spacing={2}>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Typography
                                level={'title-lg'}
                                fontWeight={600}
                            >
                                Steps
                            </Typography>
                            <Button
                                size="sm"
                                startDecorator={<Plus size={16} />}
                                onClick={addStep}
                                sx={{
                                    borderRadius: theme.vars.radius.md
                                }}
                            >
                                Add Step
                            </Button>
                        </Stack>
                        {steps.map((step, index) => (
                            <Stack
                                key={index}
                                direction={'row'}
                                spacing={2}
                                alignItems={'flex-start'}
                            >
                                <FormControl sx={{ flex: 1 }}>
                                    <FormLabel>Step {step.stepNumber}: </FormLabel>
                                    <Input
                                        value={step.description}
                                        onChange={(event) =>
                                            updateStep(index, event.target.value)
                                        }
                                        placeholder="Enter step description"
                                        sx={{
                                            borderRadius: theme.vars.radius.md
                                        }}
                                    />
                                </FormControl>
                                {steps.length > 1 && (
                                    <IconButton
                                        color="danger"
                                        variant="soft"
                                        onClick={() => removeStep(index)}
                                        sx={{
                                            borderRadius: theme.vars.radius.md,
                                            mt: 3.5
                                        }}
                                    >
                                        <X size={18} />
                                    </IconButton>
                                )}
                            </Stack>
                        ))}
                    </Stack>

                    <ErrorAlert
                        error={error}
                        show={showError}
                        onClose={clearError}
                    />
                    <Box height={24} />
                    <Button
                        sx={{
                            borderRadius: theme.vars.radius.md
                        }}
                        loading={isLoading}
                        onClick={handleSubmit}
                        size="lg"
                    >
                        Create Recipe
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

