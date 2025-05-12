provider "aws" {
  region = "us-east-1"  # שנה לאזור הרצוי לך
}

resource "aws_ecs_cluster" "my_cluster" {
  name = "my-app-cluster"
}

resource "aws_ecs_task_definition" "my_task" {
  family                   = "my-task"
  container_definitions    = <<EOF
[
  {
    "name": "my-app-container",
    "image": "yagen1111/mywebsite:latest",
    "memory": 512,
    "cpu": 256
  }
]
EOF
}