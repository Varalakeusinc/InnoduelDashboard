import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Arena } from "@/src/services/arena";
import { useTranslation } from 'react-i18next';

interface ArenaSelectorProps {
    arenas: Arena[];
    onChange: (arenaId: string) => void;
}

const ArenaSelector: React.FC<ArenaSelectorProps> = ({ arenas, onChange }) => {
    const { t } = useTranslation();
    const [selectedArena, setSelectedArena] = useState<Arena | null>(null);
    const placeholder = t("select_arena");

    useEffect(() => {
        if (selectedArena && !arenas.some(arena => arena.id === selectedArena.id)) {
            setSelectedArena(null);
        }
    }, [arenas, selectedArena]);

    const handleArenaChange = (value: string) => {
        const selectedArena = arenas.find(arena => arena.id === value);
        setSelectedArena(selectedArena || null);
        onChange(value);
    };

    return (
        <Select onValueChange={handleArenaChange} disabled={arenas.length === 0}>
            <SelectTrigger aria-label={placeholder}>
                <SelectValue placeholder={placeholder}>{selectedArena ? selectedArena.name : placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {arenas.map((arena) => (
                    <SelectItem key={arena.id} value={arena.id}>{arena.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default ArenaSelector;
