#!/bin/bash

echo "🔍 ConsensusAI Status Check"
echo "=========================="

# Check if containers are running
echo "📦 Container Status:"
sudo docker compose ps

echo ""
echo "🏥 Health Checks:"

# Check backend health
echo -n "Backend API: "
if curl -s http://localhost:3000/health > /dev/null; then
    echo "✅ Healthy"
    echo "   $(curl -s http://localhost:3000/health | jq -r '(.status // "unknown") + " - " + (.totalModels | tostring) + " models available"')"
else
    echo "❌ Not responding"
fi

# Check frontend
echo -n "Frontend:    "
if curl -s -I http://localhost | grep -q "200 OK"; then
    echo "✅ Accessible"
else
    echo "❌ Not accessible"
fi

echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost"
echo "   Backend:  http://localhost:3000"
echo "   Health:   http://localhost:3000/health"

echo ""
echo "📊 Quick Commands:"
echo "   View logs:    sudo docker compose logs -f"
echo "   Restart:      sudo docker compose restart"
echo "   Stop:         sudo docker compose down"
echo "   Rebuild:      sudo docker compose down && sudo docker compose build && sudo docker compose up -d"
