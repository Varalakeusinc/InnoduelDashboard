DO $$
DECLARE
    v_user_id INTEGER;
    v_company_id INTEGER;
    v_arena_id INTEGER;
    v_arena_names TEXT[] := ARRAY['Arena 1', 'Arena 2', 'Arena 3', 'Arena 4', 'Arena 5', 'Arena 6', 'Arena 7', 'Arena 8', 'Arena 9', 'Arena 10'];
    v_arena_info_texts TEXT[] := ARRAY['Info for Arena 1', 'Info for Arena 2', 'Info for Arena 3', 'Info for Arena 4', 'Info for Arena 5', 'Info for Arena 6', 'Info for Arena 7', 'Info for Arena 8', 'Info for Arena 9', 'Info for Arena 10'];
    i INTEGER;
BEGIN
    RAISE NOTICE 'Creating user...';
    INSERT INTO user_info (name, anon, created)
    VALUES ('compare_win_dummy_user', FALSE, now())
    RETURNING id INTO v_user_id;
    RAISE NOTICE 'User with ID % created.', v_user_id;

    RAISE NOTICE 'Creating company...';
    INSERT INTO company (name)
    VALUES ('compare_win_dummy')
    RETURNING id INTO v_company_id;
    RAISE NOTICE 'Company with ID % created.', v_company_id;

    RAISE NOTICE 'Creating arenas...';
    FOR i IN 1..array_length(v_arena_names, 1) LOOP
        INSERT INTO arena (name, info_text, company_id)
        VALUES (v_arena_names[i], v_arena_info_texts[i], v_company_id);
    END LOOP;
    RAISE NOTICE 'Arenas created for company ID %.', v_company_id;

    RAISE NOTICE 'Inserting ideas into arenas...';
    FOR v_arena_id IN SELECT id FROM arena WHERE company_id = v_company_id LOOP
    INSERT INTO idea (idea_text, arena_id, win_rate, user_id)
    SELECT 
        'Idea ' || generate_series, 
        v_arena_id, 
        random() * 100 AS win_rate, -- Random winrate for test data
        v_user_id
    FROM 
    generate_series(1, 10);
    END LOOP;
    RAISE NOTICE 'Ideas inserted for arenas of company ID %.', v_company_id;
END $$;
