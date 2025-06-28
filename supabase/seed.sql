-- Seed data for markdown-editor application

-- Create test users (if using local development)
-- Note: In production, users would be created through authentication
-- This is just for local development and testing
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('d0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', 'test@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz012345', NOW(), NOW(), NOW()),
  ('e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', 'demo@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz012345', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed folders
INSERT INTO folders (id, name, user_id, parent_id, created_at, updated_at)
VALUES
  -- Root folders
  ('11111111-1111-1111-1111-111111111111', 'Personal', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', NULL, NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Work', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', NULL, NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'Projects', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', NULL, NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'Notes', 'e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', NULL, NOW(), NOW()),
  
  -- Subfolders
  ('55555555-5555-5555-5555-555555555555', 'Journal', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666666', 'Recipes', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', '11111111-1111-1111-1111-111111111111', NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777777', 'Meetings', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', '22222222-2222-2222-2222-222222222222', NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', 'Ideas', 'e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', '44444444-4444-4444-4444-444444444444', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed documents
INSERT INTO documents (id, title, content, folder_id, user_id, is_favorite, created_at, updated_at)
VALUES
  -- Personal documents
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Welcome Note', '# Welcome to Markdown Editor\n\nThis is your first note. You can edit it or create a new one.\n\n## Features\n\n- Markdown support\n- Folder organization\n- Tags\n- Favorites', '11111111-1111-1111-1111-111111111111', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', true, NOW(), NOW()),
  
  -- Journal entries
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Journal Entry 1', '# Today was a good day\n\nI started working on a new project and made significant progress.', '55555555-5555-5555-5555-555555555555', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', false, NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Journal Entry 2', '# Reflections\n\nThinking about the direction of my career and next steps.', '55555555-5555-5555-5555-555555555555', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', false, NOW(), NOW()),
  
  -- Recipes
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Chocolate Chip Cookies', '# Chocolate Chip Cookies\n\n## Ingredients\n\n- 2 1/4 cups all-purpose flour\n- 1 tsp baking soda\n- 1 tsp salt\n- 1 cup butter, softened\n- 3/4 cup granulated sugar\n- 3/4 cup brown sugar\n- 2 eggs\n- 2 tsp vanilla extract\n- 2 cups chocolate chips\n\n## Instructions\n\n1. Preheat oven to 375°F\n2. Mix ingredients\n3. Bake for 9-11 minutes', '66666666-6666-6666-6666-666666666666', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', true, NOW(), NOW()),
  
  -- Work documents
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Project Roadmap', '# Q3 Project Roadmap\n\n## Milestones\n\n- [ ] Research phase (July)\n- [ ] Design phase (August)\n- [ ] Implementation (September)\n\n## Resources\n\n- Team: 4 developers, 1 designer\n- Budget: $50,000', '22222222-2222-2222-2222-222222222222', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', false, NOW(), NOW()),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Meeting Notes', '# Team Meeting - July 15\n\n## Attendees\n\n- John\n- Sarah\n- Michael\n- Lisa\n\n## Discussion Points\n\n1. Current project status\n2. Blockers\n3. Next steps', '77777777-7777-7777-7777-777777777777', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', false, NOW(), NOW()),
  
  -- Demo user documents
  ('99999999-9999-9999-9999-999999999999', 'Ideas for App', '# App Ideas\n\n1. Task management app with AI prioritization\n2. Recipe app that suggests meals based on ingredients you have\n3. Language learning app with spaced repetition', '88888888-8888-8888-8888-888888888888', 'e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', true, NOW(), NOW()),
  ('12121212-1212-1212-1212-121212121212', 'Learning Resources', '# Resources for Learning\n\n## Programming\n\n- Codecademy\n- freeCodeCamp\n- LeetCode\n\n## Design\n\n- Figma tutorials\n- Dribbble inspiration', '44444444-4444-4444-4444-444444444444', 'e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', false, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed tags
-- Replace these lines in the tags section
INSERT INTO tags (id, name, color, user_id, created_at)
VALUES
-- User 1 tags
('11111111-1111-1111-1111-111111111111', 'Personal', '#ff5722', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', NOW()),
('22222222-2222-2222-2222-222222222222', 'Work', '#2196f3', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', NOW()),
('33333333-3333-3333-3333-333333333333', 'Important', '#f44336', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', NOW()),
('44444444-4444-4444-4444-444444444444', 'Recipe', '#4caf50', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', NOW()),
('55555555-5555-5555-5555-555555555555', 'Journal', '#9c27b0', 'd0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', NOW()),

-- User 2 tags
('66666666-6666-6666-6666-666666666666', 'Ideas', '#009688', 'e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', NOW()),
('77777777-7777-7777-7777-777777777777', 'Learning', '#3f51b5', 'e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', NOW()),
('88888888-8888-8888-8888-888888888888', 'Reference', '#607d8b', 'e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', NOW())
ON CONFLICT (id) DO NOTHING;

-- And update these references in the document_tags section
INSERT INTO document_tags (document_id, tag_id)
VALUES
-- Welcome note tags
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333'),

-- Journal entries tags
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '55555555-5555-5555-5555-555555555555'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '55555555-5555-5555-5555-555555555555'),

-- Recipe tags
('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444'),

-- Work documents tags
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222'),

-- Demo user documents tags
('99999999-9999-9999-9999-999999999999', '66666666-6666-6666-6666-666666666666'),
('12121212-1212-1212-1212-121212121212', '77777777-7777-7777-7777-777777777777'),
('12121212-1212-1212-1212-121212121212', '88888888-8888-8888-8888-888888888888')
ON CONFLICT (document_id, tag_id) DO NOTHING;

-- Seed user_settings
INSERT INTO user_settings (user_id, theme, font_size, line_spacing, auto_save, created_at, updated_at)
VALUES
  ('d0c5340a-9b57-4a75-a5a4-45d9c9be2ccc', 'light', 16, 1.5, true, NOW(), NOW()),
  ('e1c6340a-9b57-4a75-a5a4-45d9c9be2cdd', 'dark', 18, 1.8, true, NOW(), NOW())
ON CONFLICT (user_id) DO NOTHING;