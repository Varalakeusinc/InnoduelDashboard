DO $$
DECLARE
    v_company_id INTEGER;
    v_user_id INTEGER;
BEGIN
    RAISE NOTICE 'Fetching company_id...';
    SELECT id INTO v_company_id FROM company WHERE name = 'compare_win_dummy';
    RAISE NOTICE 'Company ID: %', v_company_id;

    RAISE NOTICE 'Fetching user_id...';
    SELECT id INTO v_user_id FROM user_info WHERE name = 'compare_win_dummy_user';
    RAISE NOTICE 'User ID: %', v_user_id;

    RAISE NOTICE 'Deleting ideas...';
    DELETE FROM idea WHERE arena_id IN (SELECT id FROM arena WHERE company_id = v_company_id);
    RAISE NOTICE 'Ideas deleted.';

    RAISE NOTICE 'Deleting arenas...';
    DELETE FROM arena WHERE company_id = v_company_id;
    RAISE NOTICE 'Arenas deleted.';

    RAISE NOTICE 'Deleting company...';
    DELETE FROM company WHERE id = v_company_id;
    RAISE NOTICE 'Company deleted.';

    RAISE NOTICE 'Deleting user...';
    DELETE FROM user_info WHERE id = v_user_id;
    RAISE NOTICE 'User deleted.';

    RAISE NOTICE 'Operation completed successfully.';
END $$;
