import { DimensionType } from './dimension';
import { FunctionType, PercentageType } from './global';
import { ImageType } from './image';
import { KeywordType } from './keyword';

export type CSSType = DimensionType | ImageType | KeywordType | PercentageType | FunctionType;
