-- Add {App Name} to applications catalog
-- Run this after creating the applications table

INSERT INTO `applications` (`app_code`, `name`, `description`, `category`, `base_price`, `status`) 
VALUES (
  '{app-code}',
  '{App Name}',
  '{Application description}',
  '{category}',
  0.00,
  'active'
)
ON DUPLICATE KEY UPDATE 
  `name` = VALUES(`name`),
  `description` = VALUES(`description`),
  `category` = VALUES(`category`),
  `status` = VALUES(`status`);

-- Add application route
INSERT INTO `application_routes` (`application_id`, `route_path`, `route_type`, `is_default`)
SELECT `id`, '/{route-path}', 'page', TRUE 
FROM `applications` 
WHERE `app_code` = '{app-code}'
ON DUPLICATE KEY UPDATE `route_path` = VALUES(`route_path`);

