import { Box, Button, useTheme } from '@mui/joy';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, type JSX } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CourseCard from './CourseCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { CourseDto } from '../services/course/course.dto';

interface CourseCarouselProps {
    courses: CourseDto[];
    showRank?: boolean;
    showRating?: boolean;
}

export default function CourseCarousel({
    courses,
    showRank = false
}: CourseCarouselProps): JSX.Element {
    const theme = useTheme();
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <Box
            sx={{
                position: 'relative',
                paddingLeft: '24px',
                paddingRight: '24px',
                marginLeft: '-24px',
                marginRight: '-24px',
                '& .swiper': {
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    marginTop: '-8px',
                    marginBottom: '-8px'
                }
            }}
        >
            {/* Previous Button */}
            <Button
                variant="solid"
                color="primary"
                disabled={isBeginning}
                onClick={() => swiperRef.current?.slidePrev()}
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    minWidth: 48,
                    minHeight: 48,
                    borderRadius: '50%',
                    padding: 0,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease',
                    opacity: 0.7,
                    '&:hover:not(:disabled)': {
                        transform: 'translateY(-50%) scale(1.05)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                        opacity: 1
                    },
                    '&:disabled': {
                        backgroundColor: theme.vars.palette.neutral[200],
                        color: theme.vars.palette.neutral[400],
                        cursor: 'not-allowed',
                        boxShadow: 'none',
                        '& svg': {
                            color: theme.vars.palette.neutral[400]
                        }
                    }
                }}
            >
                <ChevronLeft size={24} />
            </Button>

            {/* Next Button */}
            <Button
                variant="solid"
                color="primary"
                disabled={isEnd}
                onClick={() => swiperRef.current?.slideNext()}
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    minWidth: 48,
                    minHeight: 48,
                    borderRadius: '50%',
                    padding: 0,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    opacity: 0.7,
                    transition: 'all 0.3s ease',
                    '&:hover:not(:disabled)': {
                        transform: 'translateY(-50%) scale(1.05)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                        opacity: 1
                    },
                    '&:disabled': {
                        backgroundColor: theme.vars.palette.neutral[200],
                        color: theme.vars.palette.neutral[400],
                        cursor: 'not-allowed',
                        boxShadow: 'none',
                        '& svg': {
                            color: theme.vars.palette.neutral[400]
                        }
                    }
                }}
            >
                <ChevronRight size={24} />
            </Button>

            {/* Swiper */}
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={3}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    600: {
                        slidesPerView: 2
                    },
                    900: {
                        slidesPerView: 3
                    }
                }}
            >
                {courses.map((course, index) => (
                    <SwiperSlide key={course.courseId}>
                        <CourseCard
                            course={course}
                            showRank={showRank}
                            rank={showRank ? index + 1 : undefined}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}

